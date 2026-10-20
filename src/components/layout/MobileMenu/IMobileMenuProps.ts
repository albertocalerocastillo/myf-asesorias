export interface IMobileMenuProps {
  /** Si el menú está abierto. Siempre está montado, para poder animar también el cierre. */
  open: boolean;
  /** Se llama al elegir una opción o pulsar Escape. */
  onClose: () => void;
}
