import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner: React.FC<SpinnerProps> = ({
  label = 'Cargando...',
  size = 'md',
}) => {
  return (
    <div className={`spinner spinner-${size}`} role="status" aria-live="polite">
      <div className="spinner-circle" aria-hidden="true"></div>
      {label && <div className="spinner-label">{label}</div>}
    </div>
  );
};
