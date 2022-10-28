import React from "react";

interface BackIconProps {
  title: string;
}

export const BackIcon = ({ title }: BackIconProps) => (
  <svg width={12} height={22}>
    <title>{title}</title>
    <path
      d="M3.621 11l7.94-7.94A1.5 1.5 0 009.439.94l-9 9a1.5 1.5 0 000 2.12l9 9a1.5 1.5 0 002.122-2.12L3.62 11z"
      fill="#3FABFF"
      fillRule="nonzero"
    />
  </svg>
);
