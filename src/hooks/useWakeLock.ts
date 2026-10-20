// Mantiene la pantalla encendida mientras `active` sea true (Screen Wake Lock API), para cocinar
// con la receta delante sin que el móvil se apague. Si el navegador no lo soporta, no hace nada.
import { useEffect, useSyncExternalStore } from 'react';

const VISIBLE_STATE = 'visible';

// El soporte no cambia durante la visita: no hace falta suscribirse a nada.
const subscribeNever = (): (() => void) => () => undefined;
const isSupportedInBrowser = (): boolean => 'wakeLock' in navigator;
// En el HTML prerenderizado se asume que no, para que coincida al hidratar.
const isSupportedOnServer = (): boolean => false;

export const useWakeLock = (active: boolean): boolean => {
  const supported = useSyncExternalStore(subscribeNever, isSupportedInBrowser, isSupportedOnServer);

  useEffect(() => {
    if (!active || !('wakeLock' in navigator)) {
      return;
    }

    let sentinel: WakeLockSentinel | null = null;
    let released = false;
    const request = async (): Promise<void> => {
      try {
        sentinel = await navigator.wakeLock.request('screen');
        // Si se desactivó mientras el navegador lo concedía, se suelta al momento.
        if (released) {
          void sentinel.release();
        }
      } catch {
        // El navegador puede negarlo (batería baja, pestaña oculta…): la receta sigue funcionando.
        sentinel = null;
      }
    };

    // Al volver a la pestaña, el navegador suelta el bloqueo: hay que pedirlo otra vez.
    const handleVisibility = (): void => {
      if (document.visibilityState === VISIBLE_STATE) {
        void request();
      }
    };

    void request();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      released = true;
      document.removeEventListener('visibilitychange', handleVisibility);
      void sentinel?.release();
    };
  }, [active]);

  return supported;
};
