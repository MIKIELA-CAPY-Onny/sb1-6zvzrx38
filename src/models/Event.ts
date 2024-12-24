export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: {
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  type: 'MUNDANE' | 'CHRISTIAN';
  category: string;
  price: number;
  availableTickets: number;
  organizer: string;
  image: string;
}