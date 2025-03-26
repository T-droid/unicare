import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Clock, 
  Calendar as CalendarIcon, 
  MoreVertical, 
  Edit2, 
  Trash2 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const ScheduleManager: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
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

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              Schedule Manager
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Organize and manage your daily events with ease
            </p>
          </div>
          <Button 
            variant="default" 
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Create New Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Card */}
          <Card className="md:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 border-0">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="w-full relative justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-lg"
                  showOutsideDays={false}
                  classNames={{
                    month: "w-full space-y-4",
                    caption: "flex justify-center items-center relative",
                    caption_label: "text-sm font-medium",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                    nav: "absolute right-1 top-2 flex items-center space-x-1",
                    nav_button: "h-8 w-8 bg-gray-500 hover:bg-blue-100 p-0 opacity-70 hover:opacity-100 rounded-full flex items-center justify-center",
                    nav_button_previous: "absolute left-1 bg-gray-500",
                    nav_button_next: "absolute right-1",
                    row: "flex w-full mt-2",
                    // cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-100 [&:has([aria-selected='true'])]:bg-blue-200",
                    day: "h-9 w-9 p-0 font-normal text-center aria-selected:opacity-50 hover:text-black hover:bg-blue-100 rounded-full",
                    day_selected: "bg-blue-500 text-white hover:bg-blue-600",
                    day_today: "bg-blue-50 text-blue-600",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-blue-100",
                    day_hidden: "invisible",
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule Card */}
          <Card className="md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-0">
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                {formatDate(selectedDate)}
              </CardTitle>
              {events.length > 0 && (
                <span className="text-gray-500 dark:text-gray-400">
                  {events.length} Event{events.length !== 1 ? 's' : ''}
                </span>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              {events.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <CalendarIcon size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No events scheduled for this date</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-lg">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-blue-500" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon size={16} className="text-green-500" />
                            <span>{event.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          event.type === 'work' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {event.type}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical size={20} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit2 size={16} className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer text-red-600 focus:text-red-600"
                              onSelect={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 size={16} className="mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager;