import React from 'react';
import { cn } from '../../lib/utils';
type StatusType =
'Open' |
'In Progress' |
'Resolved' |
'Closed' |
'Active' |
'Maintenance' |
'Retired' |
'Critical' |
'High' |
'Medium' |
'Low';
interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case 'open':
      case 'critical':
      case 'retired':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'in progress':
      case 'high':
      case 'maintenance':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'resolved':
      case 'active':
      case 'low':
        return 'bg-teal-50 text-teal-700 border-teal-100';
      case 'closed':
      case 'medium':
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getStyles(status),
        className
      )}>

      {status}
    </span>);

}