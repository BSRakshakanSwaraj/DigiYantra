import React from 'react';
import { cn } from '../../lib/utils';
interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border border-gray-100 shadow-sm p-6 overflow-hidden',
        onClick &&
        'cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1',
        className
      )}>

      {children}
    </div>);

}