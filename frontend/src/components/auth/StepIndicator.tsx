import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}
export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {Array.from({
        length: totalSteps
      }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        return (
          <div key={index} className="flex items-center">
            {index > 0 &&
            <div
              className={cn(
                'h-0.5 w-8 mr-4 transition-colors duration-300',
                isCompleted ? 'bg-teal-500' : 'bg-gray-200'
              )} />

            }
            <motion.div
              initial={false}
              animate={{
                backgroundColor: isActive ?
                '#f97316' :
                isCompleted ?
                '#0d9488' :
                '#f3f4f6',
                scale: isActive ? 1.1 : 1
              }}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300',
                isActive || isCompleted ? 'text-white' : 'text-gray-400'
              )}>

              {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
            </motion.div>
          </div>);

      })}
    </div>);

}