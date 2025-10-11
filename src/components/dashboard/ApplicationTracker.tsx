import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, Users, CheckCircle, XCircle, Calendar, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { applications, Application } from '@/data/dashboard';

const ApplicationTracker: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const columns = [
    { id: 'Applied', title: 'Applied', icon: FileText, color: 'bg-blue-500', hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-950/20' },
    { id: 'Under Review', title: 'Under Review', icon: Clock, color: 'bg-yellow-500', hoverBg: 'hover:bg-yellow-50 dark:hover:bg-yellow-950/20' },
    { id: 'Interview', title: 'Interview', icon: Users, color: 'bg-purple-500', hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-950/20' },
    { id: 'Selected', title: 'Selected', icon: CheckCircle, color: 'bg-green-500', hoverBg: 'hover:bg-green-50 dark:hover:bg-green-950/20' },
    { id: 'Rejected', title: 'Rejected', icon: XCircle, color: 'bg-red-500', hoverBg: 'hover:bg-red-50 dark:hover:bg-red-950/20' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'Interview':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'Selected':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const getColumnApplications = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Application Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 gap-6 p-6">
          {columns.map((column, columnIndex) => {
            const columnApps = getColumnApplications(column.id);
            const IconComponent = column.icon;

            return (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: columnIndex * 0.1 }}
                className="space-y-4 bg-gradient-to-b from-background to-muted/50 rounded-xl p-4 shadow-sm border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${column.color} text-white shadow-lg`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{column.title}</h3>
                    <p className="text-sm text-muted-foreground">{columnApps.length} applications</p>
                  </div>
                </div>

                <div className="space-y-3 min-h-[150px]">
                  <AnimatePresence>
                    {columnApps.map((app, appIndex) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: appIndex * 0.05 }}
                        className={`bg-card border border-border rounded-xl p-5 hover:shadow-xl transition-all duration-300 cursor-pointer ${column.hoverBg} hover:border-primary/20`}
                        onClick={() => setSelectedApplication(app)}
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium text-foreground text-sm">{app.position}</h4>
                          <p className="text-xs text-muted-foreground">{app.company}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(app.date).toLocaleDateString()}
                          </div>
                          {app.notes && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Eye className="h-3 w-3" />
                              Has notes
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {columnApps.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <div className={`p-4 rounded-full ${column.color} text-white mx-auto mb-4 w-fit`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <p className="text-sm font-medium">No applications yet</p>
                      <p className="text-xs mt-1">Start applying to jobs!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Application Details Dialog */}
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground">{selectedApplication.position}</h3>
                  <p className="text-muted-foreground">{selectedApplication.company}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(selectedApplication.status)}>
                    {selectedApplication.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Applied on {new Date(selectedApplication.date).toLocaleDateString()}
                  </span>
                </div>

                {selectedApplication.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{selectedApplication.notes}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Update Status
                  </Button>
                  <Button className="flex-1">
                    View Job
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ApplicationTracker;
