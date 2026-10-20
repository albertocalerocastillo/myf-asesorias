// Datos estructurados (schema.org en JSON-LD): le explican a Google qué es cada página
// para que pueda mostrar resultados enriquecidos (recetas con tiempo, migas de pan, autor…).
import type { EntradaDiarioDTO } from '../dtos/EntradaDiarioDTO';
import type { PersonaDTO } from '../dtos/PersonaDTO';
import type { PreguntaFrecuenteDTO } from '../dtos/PreguntaFrecuenteDTO';
import type { RecetaDTO } from '../dtos/RecetaDTO';
import type { BreadcrumbItem } from '../components/ui/Breadcrumbs/IBreadcrumbsProps';
import { obtenerUrlInstagram, personas } from '../data/equipo';
import { buildAbsoluteUrl, SITE_LANGUAGE, SITE_NAME, SITE_URL } from './siteConfig';

const SCHEMA_CONTEXT = 'https://schema.org';
const ORGANIZATION_ID = `${SITE_URL}/#organizacion`;
const WEBSITE_ID = `${SITE_URL}/#web`;

const buildPersonId = (persona: PersonaDTO): string => `${buildAbsoluteUrl(persona.ruta)}#persona`;

export const buildPersonData = (persona: PersonaDTO): object => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'Person',
  '@id': buildPersonId(persona),
  name: persona.nombre,
  jobTitle: `Asesoría de ${persona.area.toLowerCase()}`,
  description: persona.frase,
  url: buildAbsoluteUrl(persona.ruta),
  sameAs: [obtenerUrlInstagram(persona.instagram)],
  worksFor: { '@id': ORGANIZATION_ID }
});

export const buildOrganizationData = (description: string, image: string): object => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'ProfessionalService',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description,
  image,
  areaServed: { '@type': 'Country', name: 'España' },
  knowsAbout: ['Nutrición', 'Entrenamiento personal', 'Salud cardiovascular', 'Alimentación saludable'],
  founder: personas.map((persona) => ({ '@id': buildPersonId(persona) })),
  sameAs: personas.map((persona) => obtenerUrlInstagram(persona.instagram))
});

export const buildWebsiteData = (): object => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: SITE_LANGUAGE,
  publisher: { '@id': ORGANIZATION_ID }
});

export const buildRecipeData = (receta: RecetaDTO, autora: PersonaDTO, image: string): object => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'Recipe',
  name: receta.titulo,
  description: receta.resumen,
  // Google exige la foto del plato para mostrar la receta enriquecida (ver fotos/LEEME.md).
  image: [image],
  author: { '@type': 'Person', '@id': buildPersonId(autora), name: autora.nombre },
  totalTime: `PT${receta.minutos}M`,
  recipeYield: `${receta.raciones}`,
  recipeCategory: receta.etiquetas[0],
  keywords: receta.etiquetas.join(', '),
  recipeCuisine: 'Mediterránea',
  recipeIngredient: receta.ingredientes,
  recipeInstructions: receta.pasos.map((paso, index) => ({ '@type': 'HowToStep', position: index + 1, text: paso }))
});

export const buildBlogPostingData = (entrada: EntradaDiarioDTO, autor: PersonaDTO, path: string, image: string): object => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'BlogPosting',
  headline: entrada.titulo,
  description: entrada.resumen,
  datePublished: entrada.fecha,
  inLanguage: SITE_LANGUAGE,
  image: [image],
  mainEntityOfPage: buildAbsoluteUrl(path),
  author: { '@type': 'Person', '@id': buildPersonId(autor), name: autor.nombre, url: buildAbsoluteUrl(autor.ruta) },
  publisher: { '@id': ORGANIZATION_ID }
});

export const buildProfilePageData = (persona: PersonaDTO): object => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'ProfilePage',
  url: buildAbsoluteUrl(persona.ruta),
  mainEntity: buildPersonData(persona)
});

export const buildFaqData = (preguntas: PreguntaFrecuenteDTO[]): object => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'FAQPage',
  mainEntity: preguntas.map((item) => ({
    '@type': 'Question',
    name: item.pregunta,
    acceptedAnswer: { '@type': 'Answer', text: item.respuesta }
  }))
});

export const buildBreadcrumbData = (items: BreadcrumbItem[], currentPath: string): object => ({
  '@context': SCHEMA_CONTEXT,
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: buildAbsoluteUrl(item.to ?? currentPath)
  }))
});
