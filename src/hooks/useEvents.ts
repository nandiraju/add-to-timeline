import { useState, useEffect } from 'react';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  start: Date;
}

export function useEvents() {
  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('timeline-events');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((e: any) => ({
          ...e,
          start: new Date(e.start),
        }));
      } catch (e) {
        console.error('Failed to parse events from localStorage', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('timeline-events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Omit<TimelineEvent, 'id'>) => {
    const newEvent: TimelineEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEvent = (id: string, updatedEvent: Omit<TimelineEvent, 'id'>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...updatedEvent, id } : e))
    );
  };

  return { events, addEvent, deleteEvent, updateEvent };
}
