import React from 'react';
import { motion } from 'framer-motion';
import { UserRole } from '../../data/mockData';
interface TabBarProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export function TabBar({ role, activeTab, onTabChange }: TabBarProps) {
  const tabs = {
    user: ['Overview', 'My Devices', 'My Complaints'],
    admin: ['Overview', 'All Complaints', 'Devices', 'Users'],
    service: ['Assigned', 'In Progress', 'Completed']
  };
  const currentTabs = tabs[role];
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto no-scrollbar">
          {currentTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`
                  relative py-4 px-1 text-sm font-medium transition-colors whitespace-nowrap
                  ${isActive ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'}
                `}>

                {tab}
                {isActive &&
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-brand"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }} />

                }
              </button>);

          })}
        </div>
      </div>
    </div>);

}