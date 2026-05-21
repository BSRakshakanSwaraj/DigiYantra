import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { Device } from '../../data/mockData';
import * as Icons from 'lucide-react';
import {
  Laptop,
  Smartphone,
  Printer,
  Monitor,
  Tablet,
  Server } from
'lucide-react';
interface DeviceGridProps {
  devices: Device[];
}
const iconMap = {
  Laptop,
  Smartphone,
  Printer,
  Monitor,
  Tablet,
  Server
};
export function DeviceGrid({ devices }: DeviceGridProps) {
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {devices.map((device) => {
        const Icon = iconMap[device.type] || Icons.HelpCircle;
        return (
          <motion.div key={device.id} variants={item}>
            <Card className="hover:border-orange-200 group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-orange-50 transition-colors">
                  <Icon className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
                </div>
                <StatusBadge status={device.status} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{device.name}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {device.serialNumber}
              </p>
              <div className="pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
                <span>
                  Purchased:{' '}
                  {new Date(device.purchaseDate).toLocaleDateString()}
                </span>
              </div>
            </Card>
          </motion.div>);

      })}
    </motion.div>);

}