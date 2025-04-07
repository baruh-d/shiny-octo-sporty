import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "@/lib/supabase/client"

export interface Event {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  type: string
  sport: string
  max_participants: number
  current_participants: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  image_url?: string
  organizer_id: string
  created_at: string
  updated_at: string
}

interface EventsState {
  items: Event[]
  selectedEvent: Event | null
  isLoading: boolean
  error: string | null
}

const initialState: EventsState = {
  items: [],
  selectedEvent: null,
  isLoading: false,
  error: null,
}

export const fetchEvents = createAsyncThunk("events/fetchEvents", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("events").select("*").order("start_date", { ascending: true })

    if (error) throw error
    return data as Event[]
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('An unknown error occurred')
  }
})

export const fetchEventById = createAsyncThunk("events/fetchEventById", async (id: string, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("events").select("*").eq("id", id).single()

    if (error) throw error
    return data as Event
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('An unknown error occurred')
  }
})

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData: Partial<Event>, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("events").insert([eventData]).select().single()

      if (error) throw error
      return data as Event
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }  
      return rejectWithValue('An unknown error occurred')}
  },
)

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, eventData }: { id: string; eventData: Partial<Event> }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("events").update(eventData).eq("id", id).select().single()

      if (error) throw error
      return data as Event
    } catch (error: unknown) {
        if (error instanceof Error) {
            return rejectWithValue(error.message)
        }
        return rejectWithValue('An unknown error occurred')}
  },
)

export const deleteEvent = createAsyncThunk("events/deleteEvent", async (id: string, { rejectWithValue }) => {
  try {
    const { error } = await supabase.from("events").delete().eq("id", id)

    if (error) throw error
    return id
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('An unknown error occurred')}
})

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch Event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedEvent = action.payload
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Create Event
      .addCase(createEvent.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Update Event
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.items.findIndex((event) => event.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        if (state.selectedEvent?.id === action.payload.id) {
          state.selectedEvent = action.payload
        }
      })
      // Delete Event
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter((event) => event.id !== action.payload)
        if (state.selectedEvent?.id === action.payload) {
          state.selectedEvent = null
        }
      })
  },
})

export default eventsSlice.reducer

