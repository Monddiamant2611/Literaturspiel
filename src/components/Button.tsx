import type { ButtonHTMLAttributes, ReactNode } from "react";
export function Button({ children, variant="primary", className="", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: "primary"|"secondary" }) { return <button className={`button button--${variant} ${className}`.trim()} {...props}>{children}</button>; }
