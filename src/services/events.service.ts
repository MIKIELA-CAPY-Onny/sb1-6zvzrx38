import { supabase } from './supabase';
import { Event } from '../models/Event';

export const eventsService = {
  async getEvents(filters?: {
    type?: 'MUNDANE' | 'CHRISTIAN';
    category?: string;
    search?: string;
  }) {
    let query = supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async getEventById(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async createEvent(event: Omit<Event, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();
    return { data, error };
  },
};