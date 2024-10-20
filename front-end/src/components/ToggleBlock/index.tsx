import React from 'react';

export const ToggleBlock: React.FC<{
  title: string;
  children: React.ReactNode;
  onIconClick: () => void;
  onTitleClick: () => void;
  isSelected: boolean;
  isOpen: boolean;
}> = ({
  title,
  children,
  onIconClick,
  onTitleClick,
  isSelected,
  isOpen,
}) => {
  return (
    <div className={`toggle-block ${isSelected ? 'selected' : ''}`}>
      <div className={`toggle-header ${isSelected ? 'selected' : ''}`}>
        <span className="toggle-icon" onClick={onIconClick}>
          {isOpen ? '▼' : '▶'}
        </span>
        <span className="toggle-title" onClick={onTitleClick}>
          {title}
        </span>
      </div>
      {isOpen && <div className="toggle-content">{children}</div>}
    </div>
  );
};
