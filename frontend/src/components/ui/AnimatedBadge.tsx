import React from 'react';
import { cn } from '../../lib/utils';
interface AnimatedBadgeProps {
  count: number;
  className?: string;
}
export function AnimatedBadge({ count, className }: AnimatedBadgeProps) {
  if (count === 0) return null;
  return (
    <span className={cn('relative flex h-5 w-5', className)}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-brand text-white text-[10px] font-bold items-center justify-center">
        {count > 9 ? '9+' : count}
      </span>
    </span>);

}