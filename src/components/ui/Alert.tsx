import React from 'react';
import './Alert.css';

interface AlertProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  message,
  actionLabel,
  onAction,
  onClose,
}) => {
  return (
    <div className="alert-overlay" role="alert" aria-live="assertive">
      <div className="alert alert-error" role="alert">
        <div className="alert-header">
          <strong className="alert-title">{title}</strong>
          {onClose && (
            <button
              className="alert-close"
              onClick={onClose}
              type="button"
              aria-label="Cerrar"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="alert-content">
          <p className="alert-message">{message}</p>
        </div>
        <div className="alert-actions">
          {actionLabel && onAction && (
            <button className="alert-action" onClick={onAction} type="button">
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
