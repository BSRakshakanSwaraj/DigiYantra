import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { Complaint } from '../../data/mockData';
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
interface SortableTableProps {
  data: Complaint[];
}
export function SortableTable({ data }: SortableTableProps) {
  const [sortField, setSortField] = useState<keyof Complaint>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const handleSort = (field: keyof Complaint) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const sortedData = [...data].sort((a, b) => {
    if (a[sortField]! < b[sortField]!) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField]! > b[sortField]!) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  const SortIcon = ({ field }: {field: keyof Complaint;}) => {
    if (sortField !== field)
    return <div className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-30" />;
    return sortDirection === 'asc' ?
    <ChevronUp className="w-4 h-4 ml-1" /> :

    <ChevronDown className="w-4 h-4 ml-1" />;

  };
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['ID', 'Title', 'Status', 'Priority', 'Assigned To', 'Date'].map(
                (header, i) => {
                  const fieldMap = [
                  'id',
                  'title',
                  'status',
                  'priority',
                  'assignedTo',
                  'createdAt'];

                  const field = fieldMap[i] as keyof Complaint;
                  return (
                    <th
                      key={header}
                      onClick={() => handleSort(field)}
                      className="px-6 py-4 font-semibold text-gray-900 cursor-pointer group hover:bg-gray-100 transition-colors select-none">

                      <div className="flex items-center">
                        {header}
                        <SortIcon field={field} />
                      </div>
                    </th>);

                }
              )}
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedData.map((row, i) =>
            <tr
              key={row.id}
              className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>

                <td className="px-6 py-4 font-medium text-gray-900">
                  #{row.id}
                </td>
                <td className="px-6 py-4 text-gray-700">{row.title}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={row.priority} />
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {row.assignedTo || '-'}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(row.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>);

}