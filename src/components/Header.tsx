import type { ReactNode } from "react";

interface HeaderProps {
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  title: string;
  subtitle?: string;
}

export function Header({ eyebrow, eyebrowIcon, title, subtitle }: HeaderProps) {
  return (
    <header className="app-header">
      {eyebrow && (
        <p className="app-header__eyebrow">
          {eyebrowIcon}
          {eyebrow}
        </p>
      )}
      <h1 className="app-header__title">{title}</h1>
      {subtitle && <p className="app-header__subtitle">{subtitle}</p>}
    </header>
  );
}
