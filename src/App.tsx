import { motion, AnimatePresence } from 'motion/react';
import { useEvents } from '@/hooks/useEvents';
import { TimelineView } from '@/components/TimelineView';
import { EventFormDialog } from '@/components/EventFormDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar as CalendarIcon, Trash2, Pencil } from 'lucide-react';
import { format } from 'date-fns';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
};

function App() {
  const { events, addEvent, deleteEvent, updateEvent } = useEvents();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 px-4 py-8 md:py-12">
      <motion.div 
        className="max-w-6xl mx-auto space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Event Timeline
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Manage and visualize your schedule in a clean timeline.
            </p>
          </div>
          <EventFormDialog onSubmit={addEvent} />
        </motion.div>

        {/* Timeline Section */}
        <motion.section variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl font-semibold px-2 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-primary" />
            Visual Timeline
          </h2>
          <TimelineView events={events} />
        </motion.section>

        {/* Event List Section */}
        <motion.section variants={itemVariants} className="space-y-4 pb-12">
          <h2 className="text-2xl font-semibold px-2 flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary" />
            Event Details
          </h2>
          
          <AnimatePresence mode="popLayout">
            {events.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="border-dashed border-2 bg-transparent">
                  <CardContent className="flex flex-col items-center justify-center h-40 text-center space-y-2 pt-6">
                    <CalendarIcon className="w-12 h-12 text-slate-300" />
                    <p className="text-slate-500 font-medium">No events created yet.</p>
                    <p className="text-sm text-slate-400">Click "Add New Event" to get started.</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[...events]
                  .sort((a, b) => a.start.getTime() - b.start.getTime())
                  .map((event) => (
                    <motion.div
                      key={event.id}
                      variants={itemVariants}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <Card className="group h-full overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b p-4">
                          <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-lg font-bold truncate pr-2">
                              {event.title}
                            </CardTitle>
                            <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                              <EventFormDialog 
                                event={event} 
                                onSubmit={(data) => updateEvent(event.id, data)}
                                trigger={
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                }
                              />
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-slate-400 hover:text-destructive"
                                onClick={() => deleteEvent(event.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <CardDescription className="flex items-center gap-1.5 mt-1 font-medium text-primary/80">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            {format(event.start, 'PPP')}
                            <span className="mx-1">•</span>
                            <Clock className="w-3.5 h-3.5 ml-1" />
                            {format(event.start, 'p')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-4">
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-4 leading-relaxed">
                            {event.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </motion.div>
    </div>
  );
}

export default App;
