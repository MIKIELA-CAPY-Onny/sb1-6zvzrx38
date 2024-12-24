import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Event } from "../models/Event";
import { EventCard } from "../components/EventCard";

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Worship Night",
    description: "A night of worship and praise",
    date: new Date("2024-04-20"),
    location: {
      name: "Central Church",
      coordinates: {
        latitude: 0,
        longitude: 0
      }
    },
    type: "CHRISTIAN",
    category: "Concert",
    price: 10,
    availableTickets: 100,
    organizer: "Central Church",
    image: "https://picsum.photos/200/300"
  },
  {
    id: "2",
    title: "Jazz Festival",
    description: "Annual Jazz Festival",
    date: new Date("2024-04-25"),
    location: {
      name: "City Park",
      coordinates: {
        latitude: 0,
        longitude: 0
      }
    },
    type: "MUNDANE",
    category: "Festival",
    price: 25,
    availableTickets: 500,
    organizer: "City Events",
    image: "https://picsum.photos/200/300"
  }
];

export function HomeScreen({ navigation }) {
  return (
    <gridLayout rows="auto, *" className="bg-gray-100">
      <searchBar
        row={0}
        hint="Search events..."
        className="m-2"
      />
      <scrollView row={1}>
        <stackLayout>
          {MOCK_EVENTS.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => navigation.navigate("EventDetails", { eventId: event.id })}
            />
          ))}
        </stackLayout>
      </scrollView>
    </gridLayout>
  );
}