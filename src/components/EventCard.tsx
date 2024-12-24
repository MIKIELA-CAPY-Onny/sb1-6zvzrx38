import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Event } from "../models/Event";

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
  return (
    <gridLayout 
      className="bg-white rounded-lg shadow-md m-2 p-4"
      rows="auto, auto, auto"
      columns="*, auto"
      onTap={onPress}
    >
      <image
        src={event.image}
        className="rounded-lg w-full h-32"
        stretch="aspectFill"
        row={0}
        col="0,1"
      />
      <stackLayout row={1} col="0">
        <label className="text-lg font-bold mt-2">{event.title}</label>
        <label className="text-sm text-gray-600">{event.location.name}</label>
        <label className="text-sm text-gray-600">
          {new Date(event.date).toLocaleDateString()}
        </label>
      </stackLayout>
      <label 
        row={1} 
        col={1} 
        className="text-lg font-bold text-right"
      >
        ${event.price}
      </label>
      <label 
        row={2} 
        col="0,1" 
        className={`text-sm mt-2 ${event.type === 'CHRISTIAN' ? 'text-blue-600' : 'text-purple-600'}`}
      >
        {event.type}
      </label>
    </gridLayout>
  );
}