import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
interface StatusToggleProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}
export function StatusToggle({
  currentStatus,
  onStatusChange
}: StatusToggleProps) {
  const statuses = ['Open', 'In Progress', 'Resolved'];
  return (
    <div className="flex bg-gray-100 p-1 rounded-lg w-full max-w-xs">
      {statuses.map((status) => {
        const isActive = currentStatus === status;
        return (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={cn(
              'relative flex-1 py-1.5 text-xs font-medium rounded-md transition-colors z-10',
              isActive ? 'text-white' : 'text-gray-500 hover:text-gray-700'
            )}>

            {isActive &&
            <motion.div
              layoutId={`status-bg-${currentStatus}`} // Unique ID per row if mapped, but here simple
              className={cn(
                'absolute inset-0 rounded-md shadow-sm -z-10',
                status === 'Open' ?
                'bg-orange-500' :
                status === 'In Progress' ?
                'bg-amber-500' :
                'bg-teal-500'
              )}
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.6
              }} />

            }
            {status}
          </button>);

      })}
    </div>);

}