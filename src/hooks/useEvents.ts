import { useState, useEffect } from 'react';
import { eventsService } from '../services/events.service';
import { Event } from '../models/Event';

export function useEvents(filters?: {
  type?: 'MUNDANE' | 'CHRISTIAN';
  category?: string;
  search?: string;
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const { data, error } = await eventsService.getEvents(filters);
        if (error) throw error;
        setEvents(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [filters]);

  return { events, loading, error };
}