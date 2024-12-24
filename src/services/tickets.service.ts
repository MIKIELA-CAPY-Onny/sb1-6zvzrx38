import { supabase } from './supabase';

export const ticketsService = {
  async bookTicket(eventId: string, userId: string) {
    const { data, error } = await supabase
      .from('tickets')
      .insert({
        event_id: eventId,
        user_id: userId,
        status: 'PENDING',
        payment_status: 'PENDING',
      })
      .select()
      .single();
    return { data, error };
  },

  async getUserTickets(userId: string) {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        events (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },
};