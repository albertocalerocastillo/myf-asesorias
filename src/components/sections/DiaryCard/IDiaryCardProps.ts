import type { EntradaDiarioDTO } from '../../../dtos/EntradaDiarioDTO';

export interface IDiaryCardProps {
  /** Entrada del diario a mostrar en la tarjeta. */
  entrada: EntradaDiarioDTO;
}
