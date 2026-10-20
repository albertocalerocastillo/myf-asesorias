// Línea de electrocardiograma: el motivo gráfico de la marca (los dos corazones que siguen latiendo).
import type { IHeartbeatProps } from './IHeartbeatProps';

const ECG_PATH = 'M0 60 H380 L400 60 L415 30 L430 60 H470 L490 60 L505 5 L525 115 L545 40 L560 60 H640 L655 48 L670 60 H1200';

const HeartbeatComponent = ({ className = '', animated = false }: IHeartbeatProps) => (
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" className={className} aria-hidden="true">
    <path
      d={ECG_PATH}
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      className={animated ? 'ecg-trazo' : ''}
    />
  </svg>
);

export default HeartbeatComponent;
