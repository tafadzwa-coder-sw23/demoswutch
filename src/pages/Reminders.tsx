import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Car, Droplets, Zap, Calendar, AlertTriangle } from "lucide-react";

interface Reminder {
  id: string;
  type: 'safety' | 'utility' | 'holiday' | 'custom';
  title: string;
  message: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    // Mock AI reminders
    const mockReminders: Reminder[] = [
      {
        id: '1',
        type: 'safety',
        title: 'Road Safety Alert',
        message: 'Remember to reduce speed and avoid drinking and driving. Stay safe on the roads!',
        time: '2 hours ago',
        priority: 'high',
        read: false
      },
      {
        id: '2',
        type: 'utility',
        title: 'Electricity Update',
        message: 'Load shedding scheduled for 2PM-4PM in your area. Plan accordingly.',
        time: '1 hour ago',
        priority: 'medium',
        read: false
      },
      {
        id: '3',
        type: 'utility',
        title: 'Water Supply',
        message: 'Water maintenance completed. Normal supply restored in your area.',
        time: '30 minutes ago',
        priority: 'low',
        read: true
      },
      {
        id: '4',
        type: 'holiday',
        title: 'Holiday Reminder',
        message: 'Independence Day is tomorrow! Many shops may have special hours.',
        time: '1 day ago',
        priority: 'medium',
        read: false
      }
    ];
    setReminders(mockReminders);
  }, []);

  const markAsRead = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, read: true } : r));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'safety': return <Car className="h-5 w-5" />;
      case 'utility': return <Zap className="h-5 w-5" />;
      case 'holiday': return <Calendar className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const unreadCount = reminders.filter(r => !r.read).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">AI Reminders</h1>
              <p className="text-muted-foreground">Smart notifications for safety, utilities, and events</p>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-sm">
                {unreadCount} unread
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {reminders.length === 0 ? (
            <Card className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No reminders yet</p>
            </Card>
          ) : (
            reminders.map(reminder => (
              <Card key={reminder.id} className={`p-4 ${!reminder.read ? 'border-l-4 border-l-primary' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(reminder.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{reminder.title}</h3>
                      <Badge variant={getPriorityColor(reminder.priority)}>
                        {reminder.priority}
                      </Badge>
                      {!reminder.read && (
                        <Badge variant="outline" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{reminder.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{reminder.time}</span>
                      {!reminder.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(reminder.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
