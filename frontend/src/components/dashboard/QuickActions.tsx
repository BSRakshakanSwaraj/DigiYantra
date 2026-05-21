import React from 'react';
import { Card } from '../ui/Card';
import { Plus, UserPlus, FileText, Users } from 'lucide-react';
import { motion } from 'framer-motion';
const actions = [
{
  icon: Plus,
  label: 'Add Device',
  desc: 'Register new hardware',
  color: 'bg-blue-50 text-blue-600'
},
{
  icon: UserPlus,
  label: 'Assign Tech',
  desc: 'Delegate tickets',
  color: 'bg-purple-50 text-purple-600'
},
{
  icon: FileText,
  label: 'Gen Report',
  desc: 'Download PDF summary',
  color: 'bg-green-50 text-green-600'
},
{
  icon: Users,
  label: 'Manage Users',
  desc: 'Add or remove staff',
  color: 'bg-orange-50 text-orange-600'
}];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action, i) =>
      <motion.div
        key={action.label}
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: i * 0.1
        }}>

          <Card className="h-full hover:border-orange-200 cursor-pointer group p-4">
            <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${action.color} group-hover:scale-110 transition-transform`}>

              <action.icon className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">
              {action.label}
            </h4>
            <p className="text-xs text-gray-500 mt-1">{action.desc}</p>
          </Card>
        </motion.div>
      )}
    </div>);

}