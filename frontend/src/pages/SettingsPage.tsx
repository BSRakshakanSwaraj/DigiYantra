import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Moon, Shield, Smartphone, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { cn } from '../lib/utils';
interface SettingsPageProps {
  onBack: () => void;
}
// Inline toggle component to avoid breaking the global StatusToggle
function Toggle({
  active,
  onToggle



}: {active: boolean;onToggle: () => void;}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20',
        active ? 'bg-orange-500' : 'bg-gray-200'
      )}>

      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm',
          active ? 'translate-x-6' : 'translate-x-1'
        )} />

    </button>);

}
export function SettingsPage({ onBack }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
    marketing: false
  });
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  useEffect(() => {
    // Apply theme
    const root = window.document.documentElement;
    root.classList.remove('dark');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      }
    }
  }, [theme]);
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="max-w-4xl mx-auto space-y-6">

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors">

          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">
            Manage your application preferences and security
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Notifications Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Notifications
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive daily summaries and critical alerts
                </p>
              </div>
              <Toggle
                active={notifications.email}
                onToggle={() =>
                setNotifications((prev) => ({
                  ...prev,
                  email: !prev.email
                }))
                } />

            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">
                  Real-time alerts for status updates
                </p>
              </div>
              <Toggle
                active={notifications.push}
                onToggle={() =>
                setNotifications((prev) => ({
                  ...prev,
                  push: !prev.push
                }))
                } />

            </div>
          </div>
        </Card>

        {/* Security Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                <span className="text-gray-700 font-medium">
                  Change Password
                </span>
              </div>
              <span className="text-sm text-gray-400">
                Last changed 3 months ago
              </span>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                <span className="text-gray-700 font-medium">
                  Two-Factor Authentication
                </span>
              </div>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Enabled
              </span>
            </button>
          </div>
        </Card>

        {/* Appearance Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <Moon className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={cn(
                'p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all',
                theme === 'light' ?
                'border-orange-500 bg-orange-50/50' :
                'border-transparent hover:bg-gray-50'
              )}>

              <div className="w-full h-20 bg-white rounded-lg border border-gray-200 shadow-sm" />
              <span
                className={cn(
                  'text-sm font-medium',
                  theme === 'light' ? 'text-orange-700' : 'text-gray-600'
                )}>

                Light
              </span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={cn(
                'p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all',
                theme === 'dark' ?
                'border-orange-500 bg-orange-50/50' :
                'border-transparent hover:bg-gray-50'
              )}>

              <div className="w-full h-20 bg-gray-900 rounded-lg shadow-sm" />
              <span
                className={cn(
                  'text-sm font-medium',
                  theme === 'dark' ? 'text-orange-700' : 'text-gray-600'
                )}>

                Dark
              </span>
            </button>

            <button
              onClick={() => setTheme('system')}
              className={cn(
                'p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all',
                theme === 'system' ?
                'border-orange-500 bg-orange-50/50' :
                'border-transparent hover:bg-gray-50'
              )}>

              <div className="w-full h-20 bg-gradient-to-br from-white to-gray-100 rounded-lg border border-gray-200 shadow-sm" />
              <span
                className={cn(
                  'text-sm font-medium',
                  theme === 'system' ? 'text-orange-700' : 'text-gray-600'
                )}>

                System
              </span>
            </button>
          </div>
        </Card>
      </div>
    </motion.div>);

}