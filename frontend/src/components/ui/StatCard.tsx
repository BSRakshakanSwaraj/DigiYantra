import React, { Component } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './Card';
import { cn } from '../../lib/utils';
import * as Icons from 'lucide-react';
interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  trendUp?: boolean;
  iconName: string;
  className?: string;
}
export function StatCard({
  label,
  value,
  trend,
  trendUp,
  iconName,
  className
}: StatCardProps) {
  // Dynamically get icon component
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
  return (
    <Card className={cn('relative overflow-hidden group', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900 tracking-tight">
            {value}
          </h3>
        </div>
        <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-6 h-6 text-orange-600" />
        </div>
      </div>

      {trend !== undefined &&
      <div className="mt-4 flex items-center text-sm">
          <span
          className={cn(
            'flex items-center font-medium',
            trendUp ? 'text-teal-600' : 'text-orange-600'
          )}>

            {trendUp ?
          <TrendingUp className="w-4 h-4 mr-1" /> :

          <TrendingDown className="w-4 h-4 mr-1" />
          }
            {trend}%
          </span>
          <span className="text-gray-400 ml-2">from last month</span>
        </div>
      }
    </Card>);

}