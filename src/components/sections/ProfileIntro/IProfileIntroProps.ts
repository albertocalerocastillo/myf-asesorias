import type { PersonaDTO } from '../../../dtos/PersonaDTO';
import type { AppAnchor } from '../../../enums/AppRoute';

export interface IProfileIntroProps {
  /** Persona que se presenta (Marta o Fran). */
  persona: PersonaDTO;
  /** Ancla de su sección de contenido (recetario o diario), para el botón secundario. */
  contentAnchor: AppAnchor;
}
