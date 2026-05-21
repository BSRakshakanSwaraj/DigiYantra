import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { StatusToggle } from './StatusToggle';
import { Complaint } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';
interface PriorityListProps {
  complaints: Complaint[];
}
export function PriorityList({ complaints }: PriorityListProps) {
  // Sort by priority: Critical > High > Medium > Low
  const priorityOrder = {
    Critical: 0,
    High: 1,
    Medium: 2,
    Low: 3
  };
  const sortedComplaints = [...complaints].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
  return (
    <div className="space-y-4">
      {sortedComplaints.map((complaint, index) =>
      <motion.div
        key={complaint.id}
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: index * 0.1
        }}>

          <Card className="flex flex-col md:flex-row md:items-center justify-between p-0 overflow-hidden">
            <div
            className={cn(
              'w-2 md:w-2 md:h-auto h-2 self-stretch',
              complaint.priority === 'Critical' ?
              'bg-red-500' :
              complaint.priority === 'High' ?
              'bg-orange-500' :
              complaint.priority === 'Medium' ?
              'bg-amber-400' :
              'bg-teal-400'
            )} />


            <div className="p-6 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                className={cn(
                  'text-xs font-bold uppercase tracking-wider',
                  complaint.priority === 'Critical' ?
                  'text-red-600' :
                  complaint.priority === 'High' ?
                  'text-orange-600' :
                  complaint.priority === 'Medium' ?
                  'text-amber-600' :
                  'text-teal-600'
                )}>

                  {complaint.priority} Priority
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500">#{complaint.id}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {complaint.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {complaint.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </div>
                {complaint.assignedTo &&
              <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                      {complaint.assignedTo.charAt(0)}
                    </div>
                    {complaint.assignedTo}
                  </div>
              }
              </div>
            </div>

            <div className="p-6 pt-0 md:pt-6 md:pl-0 flex flex-col items-start md:items-end gap-2 min-w-[200px]">
              <span className="text-xs font-medium text-gray-500 mb-1">
                Update Status
              </span>
              <StatusToggle
              currentStatus={complaint.status}
              onStatusChange={(s) => console.log('Status changed to', s)} />

            </div>
          </Card>
        </motion.div>
      )}
    </div>);

}