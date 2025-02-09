import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity,
  Filter,
  Download,
  Search,
  User,
  FileText,
  AlertCircle,
  Clock
} from 'lucide-react';

const ActivityLog = () => {
  // Sample activity data - connect to your backend
  const [activities] = useState([
    {
      id: 1,
      type: 'record_update',
      user: 'Admin John',
      action: 'Updated student medical records',
      target: 'Sarah Johnson (ID: 2024015)',
      timestamp: '2024-02-09 14:30:25',
      severity: 'normal'
    },
    {
      id: 2,
      type: 'security_alert',
      user: 'System',
      action: 'Failed login attempt detected',
      target: 'IP: 192.168.1.105',
      timestamp: '2024-02-09 14:25:10',
      severity: 'high'
    },
    {
      id: 3,
      type: 'record_access',
      user: 'Staff Mary',
      action: 'Accessed student academic records',
      target: 'Class 12A',
      timestamp: '2024-02-09 14:20:00',
      severity: 'low'
    },
    // Add more activities as needed
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'normal':
        return 'text-blue-600 bg-blue-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'record_update':
        return <FileText className="h-5 w-5" />;
      case 'security_alert':
        return <AlertCircle className="h-5 w-5" />;
      case 'record_access':
        return <User className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Activity Log</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="h-4 w-4" />
          Export Log
        </button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select 
                  className="border rounded-md p-2"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Activities</option>
                  <option value="record_update">Record Updates</option>
                  <option value="security_alert">Security Alerts</option>
                  <option value="record_access">Record Access</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search activities..."
                  className="pl-10 pr-4 py-2 border rounded-md w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <select className="border rounded-md p-2">
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                  {getTypeIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        By {activity.user} • Target: {activity.target}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLog;