import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "@/lib/supabase/client"

export interface Athlete {
  id: string
  user_id: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: string
  sport: string
  position?: string
  height?: number
  weight?: number
  location: string
  bio?: string
  achievements?: string[]
  avatar_url?: string
  created_at: string
  updated_at: string
}

interface AthletesState {
  items: Athlete[]
  selectedAthlete: Athlete | null
  isLoading: boolean
  error: string | null
}

const initialState: AthletesState = {
  items: [],
  selectedAthlete: null,
  isLoading: false,
  error: null,
}

export const fetchAthletes = createAsyncThunk("athletes/fetchAthletes", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.from("athletes").select("*").order("last_name", { ascending: true })

    if (error) throw error
    return data as Athlete[]
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('An unknown error occurred')
  }
})

export const fetchAthleteById = createAsyncThunk(
  "athletes/fetchAthleteById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("athletes").select("*").eq("id", id).single()

      if (error) throw error
      return data as Athlete
    } catch (error: unknown) {
        if (error instanceof Error) {
          return rejectWithValue(error.message)
        }
        return rejectWithValue('An unknown error occurred')
      }
    })

export const createAthlete = createAsyncThunk(
  "athletes/createAthlete",
  async (athleteData: Partial<Athlete>, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("athletes").insert([athleteData]).select().single()

      if (error) throw error
      return data as Athlete
    } catch (error: unknown) {
        if (error instanceof Error) {
          return rejectWithValue(error.message)
        }
        return rejectWithValue('An unknown error occurred')
      }
    })

export const updateAthlete = createAsyncThunk(
  "athletes/updateAthlete",
  async ({ id, athleteData }: { id: string; athleteData: Partial<Athlete> }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("athletes").update(athleteData).eq("id", id).select().single()

      if (error) throw error
      return data as Athlete
    } catch (error: unknown) {
        if (error instanceof Error) {
          return rejectWithValue(error.message)
        }
        return rejectWithValue('An unknown error occurred')
      }
    })

export const deleteAthlete = createAsyncThunk("athletes/deleteAthlete", async (id: string, { rejectWithValue }) => {
  try {
    const { error } = await supabase.from("athletes").delete().eq("id", id)

    if (error) throw error
    return id
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('An unknown error occurred')
  }
})

const athletesSlice = createSlice({
  name: "athletes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Athletes
      .addCase(fetchAthletes.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAthletes.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(fetchAthletes.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch Athlete by ID
      .addCase(fetchAthleteById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAthleteById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedAthlete = action.payload
      })
      .addCase(fetchAthleteById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Create Athlete
      .addCase(createAthlete.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Update Athlete
      .addCase(updateAthlete.fulfilled, (state, action) => {
        const index = state.items.findIndex((athlete) => athlete.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        if (state.selectedAthlete?.id === action.payload.id) {
          state.selectedAthlete = action.payload
        }
      })
      // Delete Athlete
      .addCase(deleteAthlete.fulfilled, (state, action) => {
        state.items = state.items.filter((athlete) => athlete.id !== action.payload)
        if (state.selectedAthlete?.id === action.payload) {
          state.selectedAthlete = null
        }
      })
  },
})

export default athletesSlice.reducer
