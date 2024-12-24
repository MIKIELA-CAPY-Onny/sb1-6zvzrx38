import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Event } from "../models/Event";

export function EventDetailsScreen({ route }) {
  const { eventId } = route.params;
  
  return (
    <scrollView className="bg-gray-100">
      <stackLayout className="p-4">
        <image
          src="https://picsum.photos/200/300"
          className="rounded-lg w-full h-64"
          stretch="aspectFill"
        />
        <label className="text-2xl font-bold mt-4">Event Title</label>
        <label className="text-gray-600 mt-2">Location</label>
        <label className="text-gray-600">Date</label>
        <label className="text-lg font-bold mt-4">$25</label>
        <button 
          className="bg-blue-600 text-white p-4 rounded-lg mt-4"
          onTap={() => console.log("Book ticket")}
        >
          Book Ticket
        </button>
        <label className="text-lg font-bold mt-4">Description</label>
        <label className="text-gray-600 mt-2">
          Event description goes here...
        </label>
      </stackLayout>
    </scrollView>
  );
}