import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, Calendar as CalendarIcon } from 'lucide-react';

const ScheduleManager:React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events] = useState([
    { id: 1, title: 'Team Meeting', time: '09:00 AM', duration: '1h', type: 'work' },
    { id: 2, title: 'Lunch with Client', time: '12:30 PM', duration: '1.5h', type: 'meeting' },
    { id: 3, title: 'Project Review', time: '03:00 PM', duration: '2h', type: 'work' },
  ]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-boxdark-2 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-300">Schedule Manager</h1>
          <Button className="flex items-center gap-2 text-white">
            <Plus size={20} />
            New Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Card */}
          <Card className="md:col-span-1 border-none dark:bg-boxdark">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md w-full flex justify-center bg-gray-700"
              />
            </CardContent>
          </Card>

          {/* Schedule Card */}
          <Card className="md:col-span-2 border-none dark:bg-boxdark">
            <CardHeader>
              <CardTitle>{formatDate(selectedDate)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:scale-102 hover:border-blue-500 transition-all duration-500"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-300">{event.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon size={16} />
                          <span>{event.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        event.type === 'work' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager;