import { useEffect, useRef } from 'react';
import { Timeline } from 'vis-timeline/esnext';
import { DataSet } from 'vis-data/esnext';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import type { TimelineEvent } from '@/hooks/useEvents';

interface TimelineProps {
  events: TimelineEvent[];
}

export function TimelineView({ events }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<Timeline | null>(null);
  const itemsRef = useRef<DataSet<any> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    itemsRef.current = new DataSet(
      events.map((event) => ({
        id: event.id,
        content: `
          <div style="max-width: 200px; white-space: normal; padding: 4px;">
            <div style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; margin-bottom: 2px;">
              ${event.title}
            </div>
            <div style="font-size: 11px; line-height: 1.2; color: #64748b; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;">
              ${event.description}
            </div>
          </div>
        `,
        start: event.start,
      }))
    );

    const options = {
      height: '400px',
      margin: {
        item: 20,
      },
      showCurrentTime: true,
      stack: true,
      type: 'box' as const,
    };

    timelineRef.current = new Timeline(containerRef.current, itemsRef.current, options);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
        timelineRef.current = null;
      }
    };
  }, []); // Only initialize once

  useEffect(() => {
    if (itemsRef.current && timelineRef.current) {
      const formattedItems = events.map((event) => ({
        id: event.id,
        content: `
          <div style="max-width: 200px; white-space: normal; padding: 4px;">
            <div style="font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; margin-bottom: 2px;">
              ${event.title}
            </div>
            <div style="font-size: 11px; line-height: 1.2; color: #64748b; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;">
              ${event.description}
            </div>
          </div>
        `,
        start: event.start,
      }));
      
      itemsRef.current.update(formattedItems);
      
      // Fitting the timeline to the items
      if (events.length > 0) {
        timelineRef.current.fit();
      }
    }
  }, [events]);

  return (
    <div className="w-full rounded-lg border bg-card p-4 shadow-sm overflow-hidden">
      <div ref={containerRef} className="w-full" />
    </div>
  );
}
