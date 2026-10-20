// Hueco para una foto que aún no tenemos. Cuando lleguen las fotos reales, se cambia por <img>.
import { ImageIcon } from 'lucide-react';
import { Tone } from '../../../enums/Tone';
import { toneStyles } from '../../../theme/toneStyles';
import type { IPhotoPlaceholderProps } from './IPhotoPlaceholderProps';

const PhotoPlaceholderComponent = ({ label, tone = Tone.Sand, className = '' }: IPhotoPlaceholderProps) => (
  <div className={`grid place-items-center rounded-3xl ${toneStyles[tone].soft} ${toneStyles[tone].text} ${className}`}>
    <div className="flex flex-col items-center gap-2 p-6 text-center text-sm font-medium">
      <ImageIcon className="size-8 opacity-60" />
      {label}
    </div>
  </div>
);

export default PhotoPlaceholderComponent;
