"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Event } from "@/types";

interface EventsState {
  items: Event[];
  selected: Event | null;
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchAll", async (published?: boolean) => {
  const url = published !== undefined ? `/api/events?published=${published}` : "/api/events";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json() as Promise<Event[]>;
});

export const createEvent = createAsyncThunk("events/create", async (data: Partial<Event>) => {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json() as Promise<Event>;
});

export const updateEvent = createAsyncThunk("events/update", async ({ id, data }: { id: string; data: Partial<Event> }) => {
  const res = await fetch(`/api/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update event");
  return res.json() as Promise<Event>;
});

export const deleteEvent = createAsyncThunk("events/delete", async (id: string) => {
  const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete event");
  return id;
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setSelectedEvent(state, action: PayloadAction<Event | null>) {
      state.selected = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEvents.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchEvents.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? "Error"; })
      .addCase(createEvent.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
        if (state.selected?.id === action.payload.id) state.selected = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
      });
  },
});

export const { setSelectedEvent, clearError } = eventsSlice.actions;
export default eventsSlice.reducer;
