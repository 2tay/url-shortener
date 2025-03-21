import React from 'react';

export const Select: React.FC<{
  onValueChange: (value: string) => void;
  disabled: boolean;
  children: React.ReactNode;
}> = ({ children, disabled, onValueChange }) => {
  return <div className="select" onClick={() => !disabled && onValueChange('value')}>{children}</div>;
};

export const SelectValue: React.FC<{ placeholder: string; children: React.ReactNode }> = ({
  children,
  placeholder,
}) => {
  return (
    <div className="select-value">
      {children || <span className="placeholder">{placeholder}</span>}
    </div>
  );
};

// Exemple de composant SelectContent
export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="select-content">{children}</div>;
};

// Exemple de composant SelectTrigger
export const SelectTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="select-trigger">{children}</div>;
};

export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({
  value,
  children,
}) => {
  return (
    <div className="select-item" data-value={value}>
      {children}
    </div>
  );
};
