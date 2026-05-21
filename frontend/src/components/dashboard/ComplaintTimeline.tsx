import React from 'react';
import { motion } from 'framer-motion';
import { Complaint } from '../../data/mockData';
import { StatusBadge } from '../ui/StatusBadge';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';
interface ComplaintTimelineProps {
  complaints: Complaint[];
}
export function ComplaintTimeline({ complaints }: ComplaintTimelineProps) {
  return (
    <Card className="h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
      <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
        {complaints.map((complaint, index) => {
          let dotColor = 'bg-gray-300';
          if (complaint.status === 'Open') dotColor = 'bg-orange-500';
          if (complaint.status === 'In Progress') dotColor = 'bg-amber-500';
          if (complaint.status === 'Resolved') dotColor = 'bg-teal-500';
          return (
            <motion.div
              key={complaint.id}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: index * 0.1
              }}
              className="relative pl-6">

              <div
                className={cn(
                  'absolute -left-[21px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm',
                  dotColor
                )} />

              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-gray-900">
                  {complaint.title}
                </h4>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {complaint.description}
              </p>
              <div className="flex gap-2">
                <StatusBadge status={complaint.status} />
                <StatusBadge status={complaint.priority} />
              </div>
            </motion.div>);

        })}
      </div>
    </Card>);

}