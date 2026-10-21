// Foto optimizada: AVIF o WebP en el tamaño justo para cada pantalla, con una miniatura borrosa
// de fondo mientras carga. Las versiones las genera scripts/optimize-photos.mjs a partir de fotos/.
// Si la foto aún no existe, pinta un hueco con su descripción.
import type { CSSProperties } from 'react';
import { ImageIcon } from 'lucide-react';
import { Tone } from '../../../enums/Tone';
import { toneStyles } from '../../../theme/toneStyles';
import photosManifest from '../../../data/fotos.generated.json';
import type { IPhotoProps } from './IPhotoProps';

interface PhotoInfo {
  width: number;
  height: number;
  widths: number[];
  path: string;
  placeholder: string;
}

const photos: Record<string, PhotoInfo> = photosManifest;
const SOURCE_FORMATS = ['avif', 'webp'];
const FALLBACK_FORMAT = 'webp';
const DEFAULT_SIZES = '100vw';

const buildSrcSet = (info: PhotoInfo, format: string): string =>
  info.widths.map((width) => `${info.path}-${width}.${format} ${width}w`).join(', ');

const PhotoComponent = ({ photo, label, tone = Tone.Sand, className = '', sizes = DEFAULT_SIZES, priority = false, compact = false, transitionName }: IPhotoProps) => {
  // #region Declaraciones
  const info = photo ? photos[photo] : undefined;
  const transitionStyle: CSSProperties = transitionName ? { viewTransitionName: transitionName } : {};
  // #endregion

  // #region Renderizado
  if (!info) {
    return (
      <div
        role="img"
        aria-label={label}
        style={transitionStyle}
        className={`grid place-items-center overflow-hidden rounded-3xl ${toneStyles[tone].soft} ${toneStyles[tone].text} ${className}`}
      >
        <div className={`flex flex-col items-center gap-2 text-center text-sm font-medium ${compact ? '' : 'p-6'}`} aria-hidden="true">
          <ImageIcon className={compact ? 'size-5 opacity-60' : 'size-8 opacity-60'} />
          {!compact && label}
        </div>
      </div>
    );
  }

  return (
    <picture
      className={`block overflow-hidden rounded-3xl bg-cover bg-center ${className}`}
      style={{ ...transitionStyle, backgroundImage: `url(${info.placeholder})` }}
    >
      {SOURCE_FORMATS.map((format) => (
        <source key={format} type={`image/${format}`} srcSet={buildSrcSet(info, format)} sizes={sizes} />
      ))}
      <img
        src={`${info.path}-${info.widths.at(-1)}.${FALLBACK_FORMAT}`}
        alt={label}
        width={info.width}
        height={info.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="size-full object-cover"
      />
    </picture>
  );
  // #endregion
};

export default PhotoComponent;
