"use client";
import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock, ArrowRight, CalendarDays } from "lucide-react";
import type { Event } from "@/types";
import RSVPModal from "@/components/sections/RSVPModal";

interface EventsListProps {
  upcoming: Event[];
  past: Event[];
}

function formatEventDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  } catch {
    return dateStr;
  }
}

function getDateParts(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return {
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: d.getDate().toString(),
    };
  } catch {
    return { month: "", day: dateStr };
  }
}

export default function EventsList({ upcoming, past }: EventsListProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (upcoming.length === 0 && past.length === 0) {
    return (
      <section className="py-24 bg-white text-center">
        <CalendarDays size={48} className="text-brand-gray mx-auto mb-4" />
        <h2 className="font-heading text-2xl text-brand-dark font-semibold mb-2">No Events Scheduled</h2>
        <p className="font-body text-brand-dark/55 text-sm">Check back soon for upcoming events and seminars.</p>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upcoming events */}
          {upcoming.length > 0 && (
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-semibold text-brand-dark mb-8 flex items-center gap-4">
                <span className="w-10 h-1 bg-coral-500 rounded-full inline-block" />
                Upcoming Events
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((event) => {
                  const { month, day } = getDateParts(event.eventDate);
                  return (
                    <div key={event.id} className="flex flex-col bg-white rounded-3xl border border-brand-gray shadow-luxury overflow-hidden group hover:shadow-luxury-lg hover:border-coral-500/30 transition-all duration-300">
                      {/* Image section */}
                      <div className="relative h-48 bg-brand-gray/30 overflow-hidden">
                        {event.imageUrl ? (
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-teal-950 flex items-center justify-center">
                            <CalendarDays size={40} className="text-white/10" />
                          </div>
                        )}
                        {/* Floating Date Badge */}
                        <div className="absolute top-4 right-4 w-14 h-16 rounded-xl bg-white/95 backdrop-blur shadow-luxury flex flex-col items-center justify-center text-brand-dark">
                          <span className="font-body text-[10px] font-bold tracking-widest text-coral-500 uppercase">{month}</span>
                          <span className="font-heading text-2xl font-bold leading-none">{day}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6">
                        <h3 className="font-heading text-2xl font-semibold text-brand-dark group-hover:text-teal-800 transition-colors mb-3 line-clamp-2">
                          {event.title}
                        </h3>
                        <div 
                          className="font-body text-sm text-brand-dark/60 leading-relaxed mb-6 flex-1 line-clamp-3 [&_p]:inline [&_p]:mr-1"
                          dangerouslySetInnerHTML={{ __html: event.description }}
                        />

                        <div className="space-y-2 mb-6 font-body text-xs text-brand-dark/60">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-coral-500 shrink-0" />
                            <span className="truncate">{formatEventDate(event.eventDate)}</span>
                          </div>
                          {event.eventTime && (
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-coral-500 shrink-0" />
                              <span className="truncate">{event.eventTime}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-coral-500 shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-coral-500/10 hover:bg-coral-500 border border-coral-500/20 hover:border-coral-500 text-coral-600 hover:text-white font-body font-semibold text-sm transition-all duration-300"
                        >
                          RSVP Now <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Past events */}
          {past.length > 0 && (
            <div>
              <h2 className="font-heading text-3xl font-semibold text-brand-dark mb-8 flex items-center gap-4 opacity-70">
                <span className="w-10 h-1 bg-brand-gray rounded-full inline-block" />
                Past Events
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {past.map((event) => {
                  const { month, day } = getDateParts(event.eventDate);
                  return (
                    <div key={event.id} className="p-5 rounded-2xl bg-brand-gray/30 border border-brand-gray/50 flex gap-4 opacity-75 hover:opacity-100 transition-opacity">
                      <div className="shrink-0 w-14 h-14 rounded-xl bg-white border border-brand-gray flex flex-col items-center justify-center text-brand-dark">
                        <span className="font-body text-[9px] font-bold tracking-widest text-brand-dark/40 uppercase">{month}</span>
                        <span className="font-heading text-xl font-bold leading-none">{day}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-heading text-lg font-semibold text-brand-dark line-clamp-1 mb-1">{event.title}</h4>
                        {event.location && (
                          <p className="font-body text-xs text-brand-dark/50 flex items-center gap-1.5 truncate">
                            <MapPin size={12} className="text-brand-dark/30" /> {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <RSVPModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />
    </>
  );
}
