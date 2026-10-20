// Etiqueta pequeña (Cena, Vegetariana…).
import { Tone } from '../../../enums/Tone';
import { toneStyles } from '../../../theme/toneStyles';
import type { ITagProps } from './ITagProps';

const TagComponent = ({ label, tone = Tone.Sage }: ITagProps) => (
  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneStyles[tone].soft} ${toneStyles[tone].text}`}>
    {label}
  </span>
);

export default TagComponent;
