# Fotos originales

Deja aquí las fotos tal cual llegan (JPG o PNG, cuanto más grandes mejor). El nombre del
fichero es el que se usa en `src/data/` para enlazarla, por ejemplo:

| Fichero | Dónde sale |
|---|---|
| `equipo.jpg` | Portada (Marta y Fran juntos) |
| `marta.jpg` | Página de Nutrición y portada |
| `fran.jpg` | Página de Entrenamiento y portada |
| `marta-accion.jpg` | Marta cocinando (portada, "Elige por dónde empezar") |
| `fran-accion.jpg` | Fran entrenando (portada, "Elige por dónde empezar") |
| `receta-<slug>.jpg` | Ficha de cada receta (p. ej. `receta-garbanzos-con-espinacas.jpg`) |
| `diario-<slug>.jpg` | Entrada del diario (p. ej. `diario-por-que-entreno.jpg`) |

Al ejecutar `npm run build` (o `npm run fotos`) se generan las versiones optimizadas en
`public/fotos/` y la lista `src/data/fotos.generated.json`. No hace falta tocar nada más:
si una foto existe, sale; si no, se ve el hueco provisional.
