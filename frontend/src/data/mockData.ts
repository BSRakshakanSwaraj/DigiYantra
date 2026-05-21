import {
  Laptop,
  Smartphone,
  Printer,
  Monitor,
  Tablet,
  Server,
  LucideIcon } from
'lucide-react';

export type UserRole = 'user' | 'admin' | 'service';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'Laptop' | 'Smartphone' | 'Printer' | 'Monitor' | 'Tablet' | 'Server';
  status: 'Active' | 'Maintenance' | 'Retired';
  assignedTo: string;
  serialNumber: string;
  purchaseDate: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  deviceId?: string;
}

export interface Stat {
  label: string;
  value: string | number;
  trend: number; // percentage
  trendUp: boolean;
  iconName: string;
}

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Morgan',
  email: 'alex.morgan@digiyantra.com',
  role: 'user', // Default, will be overridden by app state
  avatar:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  department: 'Engineering'
};

export const devices: Device[] = [
{
  id: 'd1',
  name: 'MacBook Pro M1',
  type: 'Laptop',
  status: 'Active',
  assignedTo: 'Alex Morgan',
  serialNumber: 'MBP-2021-001',
  purchaseDate: '2021-11-15'
},
{
  id: 'd2',
  name: 'Dell UltraSharp 27',
  type: 'Monitor',
  status: 'Active',
  assignedTo: 'Alex Morgan',
  serialNumber: 'DELL-27-002',
  purchaseDate: '2022-01-10'
},
{
  id: 'd3',
  name: 'iPhone 13 Test Device',
  type: 'Smartphone',
  status: 'Maintenance',
  assignedTo: 'Alex Morgan',
  serialNumber: 'IP13-2022-003',
  purchaseDate: '2022-03-20'
},
{
  id: 'd4',
  name: 'HP LaserJet Pro',
  type: 'Printer',
  status: 'Active',
  assignedTo: 'Office Floor 2',
  serialNumber: 'HP-PRT-004',
  purchaseDate: '2020-06-15'
},
{
  id: 'd5',
  name: 'iPad Air 5',
  type: 'Tablet',
  status: 'Active',
  assignedTo: 'Design Team',
  serialNumber: 'IPAD-2022-005',
  purchaseDate: '2022-05-01'
},
{
  id: 'd6',
  name: 'Ubuntu Server Rack',
  type: 'Server',
  status: 'Active',
  assignedTo: 'IT Dept',
  serialNumber: 'SRV-2020-006',
  purchaseDate: '2020-01-20'
},
{
  id: 'd7',
  name: 'ThinkPad X1',
  type: 'Laptop',
  status: 'Retired',
  assignedTo: 'Storage',
  serialNumber: 'TP-2019-007',
  purchaseDate: '2019-08-10'
}];


export const complaints: Complaint[] = [
{
  id: 'c1',
  title: 'Monitor flickering',
  description:
  'The external Dell monitor flickers intermittently when connected via HDMI.',
  status: 'Open',
  priority: 'Medium',
  createdBy: 'Alex Morgan',
  createdAt: '2023-10-25T09:30:00',
  deviceId: 'd2'
},
{
  id: 'c2',
  title: 'Printer jam',
  description: 'Paper jam in tray 2, cannot remove manually.',
  status: 'In Progress',
  priority: 'High',
  assignedTo: 'Sarah Tech',
  createdBy: 'John Doe',
  createdAt: '2023-10-24T14:15:00',
  deviceId: 'd4'
},
{
  id: 'c3',
  title: 'Keyboard keys stuck',
  description: 'Spacebar and Enter key are sticky on the MacBook.',
  status: 'Resolved',
  priority: 'Low',
  assignedTo: 'Mike Fix',
  createdBy: 'Alex Morgan',
  createdAt: '2023-10-20T11:00:00',
  deviceId: 'd1'
},
{
  id: 'c4',
  title: 'Server overheating',
  description: 'Server room temperature alert triggered. AC might be down.',
  status: 'Open',
  priority: 'Critical',
  createdBy: 'System',
  createdAt: '2023-10-26T08:00:00',
  deviceId: 'd6'
},
{
  id: 'c5',
  title: 'Wifi connectivity issues',
  description: 'Cannot connect to 5GHz network on 3rd floor.',
  status: 'Closed',
  priority: 'High',
  assignedTo: 'Net Admin',
  createdBy: 'Jane Smith',
  createdAt: '2023-10-18T16:45:00'
}];


export const stats = {
  user: [
  {
    label: 'Total Devices',
    value: 3,
    trend: 0,
    trendUp: true,
    iconName: 'Laptop'
  },
  {
    label: 'Active Complaints',
    value: 1,
    trend: 12,
    trendUp: false,
    iconName: 'AlertCircle'
  },
  {
    label: 'Resolved (Month)',
    value: 4,
    trend: 25,
    trendUp: true,
    iconName: 'CheckCircle'
  },
  {
    label: 'Pending Reviews',
    value: 0,
    trend: 0,
    trendUp: true,
    iconName: 'ClipboardList'
  }],

  admin: [
  {
    label: 'Total Complaints',
    value: 142,
    trend: 8,
    trendUp: false,
    iconName: 'FileText'
  },
  {
    label: 'Open Issues',
    value: 24,
    trend: 5,
    trendUp: false,
    iconName: 'AlertOctagon'
  },
  {
    label: 'Resolution Rate',
    value: '94%',
    trend: 2,
    trendUp: true,
    iconName: 'TrendingUp'
  },
  {
    label: 'Avg Res Time',
    value: '4.2h',
    trend: 15,
    trendUp: true,
    iconName: 'Clock'
  }],

  service: [
  {
    label: 'Assigned to Me',
    value: 8,
    trend: 10,
    trendUp: false,
    iconName: 'UserCheck'
  },
  {
    label: 'In Progress',
    value: 3,
    trend: 5,
    trendUp: true,
    iconName: 'Activity'
  },
  {
    label: 'Completed Today',
    value: 5,
    trend: 20,
    trendUp: true,
    iconName: 'CheckSquare'
  }]

};

export const notifications = [
{
  id: 1,
  text: 'New device assigned: MacBook Pro M3',
  time: '2h ago',
  read: false
},
{
  id: 2,
  text: 'Ticket #C2 status updated to In Progress',
  time: '4h ago',
  read: false
},
{
  id: 3,
  text: 'System maintenance scheduled for tonight',
  time: '1d ago',
  read: true
}];