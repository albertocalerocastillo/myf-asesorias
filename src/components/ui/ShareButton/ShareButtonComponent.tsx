// Botón de compartir: en el móvil abre el menú nativo (WhatsApp, Telegram, copiar enlace…);
// donde no existe, abre WhatsApp directamente. Sin JavaScript también funciona (es un enlace).
import type { MouseEvent } from 'react';
import { Share2 } from 'lucide-react';
import { Tone } from '../../../enums/Tone';
import { buildAbsoluteUrl } from '../../../seo/siteConfig';
import { toneStyles } from '../../../theme/toneStyles';
import type { IShareButtonProps } from './IShareButtonProps';

const WHATSAPP_SHARE_URL = 'https://wa.me/?text=';

const ShareButtonComponent = ({ title, path, tone = Tone.Outline }: IShareButtonProps) => {
  // #region Declaraciones
  const url = buildAbsoluteUrl(path);
  const whatsappHref = `${WHATSAPP_SHARE_URL}${encodeURIComponent(`${title} ${url}`)}`;

  const handleClick = async (event: MouseEvent<HTMLAnchorElement>): Promise<void> => {
    if (!navigator.share) {
      return;
    }
    event.preventDefault();
    try {
      await navigator.share({ title, url });
    } catch {
      // Si la persona cierra el menú de compartir, no hay nada que hacer.
    }
  };
  // #endregion

  // #region Renderizado
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold whitespace-nowrap transition ${toneStyles[tone].solid}`}
    >
      <Share2 className="size-4" aria-hidden="true" /> Compartir
    </a>
  );
  // #endregion
};

export default ShareButtonComponent;
