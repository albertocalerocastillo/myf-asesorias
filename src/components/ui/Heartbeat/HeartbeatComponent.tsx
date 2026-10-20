// Línea de electrocardiograma: el motivo gráfico de la marca (los dos corazones que siguen latiendo).
import type { IHeartbeatProps } from './IHeartbeatProps';

const ECG_PATH = 'M0 60 H380 L400 60 L415 30 L430 60 H470 L490 60 L505 5 L525 115 L545 40 L560 60 H640 L655 48 L670 60 H1200';

// Longitud fija para que las animaciones de trazo (theme.css) no dependan del tamaño real.
const PATH_LENGTH = 1400;

const HeartbeatComponent = ({ className = '', animated = false, pulse = false }: IHeartbeatProps) => (
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" className={className} aria-hidden="true">
    <path
      d={ECG_PATH}
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      pathLength={PATH_LENGTH}
      className={animated ? 'ecg-trazo' : ''}
    />
    {pulse && (
      <path
        d={ECG_PATH}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={PATH_LENGTH}
        className="ecg-pulso [filter:drop-shadow(0_0_6px_currentColor)]"
        style={{ color: 'var(--color-corazon)' }}
      />
    )}
  </svg>
);

export default HeartbeatComponent;
