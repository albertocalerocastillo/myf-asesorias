import type { RecetaDTO } from '../../../dtos/RecetaDTO';

export interface ICookingModeProps {
  /** Receta que se está cocinando. */
  receta: RecetaDTO;
}
