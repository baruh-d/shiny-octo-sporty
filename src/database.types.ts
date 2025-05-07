export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action_type: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_profiles: {
        Row: {
          achievements: Json | null
          created_at: string | null
          height: number | null
          jersey_number: number | null
          position: string | null
          team_id: string | null
          updated_at: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          achievements?: Json | null
          created_at?: string | null
          height?: number | null
          jersey_number?: number | null
          position?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          achievements?: Json | null
          created_at?: string | null
          height?: number | null
          jersey_number?: number | null
          position?: string | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_profiles_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "athlete_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_profiles: {
        Row: {
          bio: string | null
          certifications: string[] | null
          created_at: string | null
          experience_years: number | null
          specialization: string[] | null
          team_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          certifications?: string[] | null
          created_at?: string | null
          experience_years?: number | null
          specialization?: string[] | null
          team_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          certifications?: string[] | null
          created_at?: string | null
          experience_years?: number | null
          specialization?: string[] | null
          team_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coach_profiles_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string | null
          donation_date: string | null
          donation_method: string | null
          donation_type: string | null
          donor_email: string | null
          donor_id: string | null
          donor_name: string | null
          id: string
          notes: string | null
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          donation_date?: string | null
          donation_method?: string | null
          donation_type?: string | null
          donor_email?: string | null
          donor_id?: string | null
          donor_name?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          currency?: string | null
          donation_date?: string | null
          donation_method?: string | null
          donation_type?: string | null
          donor_email?: string | null
          donor_id?: string | null
          donor_name?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_inventory: {
        Row: {
          condition: string | null
          created_at: string | null
          donation_id: string | null
          id: string
          item_name: string
          quantity: number
          storage_location: string | null
        }
        Insert: {
          condition?: string | null
          created_at?: string | null
          donation_id?: string | null
          id?: string
          item_name: string
          quantity: number
          storage_location?: string | null
        }
        Update: {
          condition?: string | null
          created_at?: string | null
          donation_id?: string | null
          id?: string
          item_name?: string
          quantity?: number
          storage_location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipment_inventory_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      event_athletes: {
        Row: {
          athlete_id: string | null
          created_at: string | null
          event_id: string | null
          id: string
        }
        Insert: {
          athlete_id?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
        }
        Update: {
          athlete_id?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_athletes_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athlete_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "event_athletes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_teams: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          team_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          team_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_teams_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          event_type: string | null
          id: string
          location: string | null
          start_date: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          start_date: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          start_date?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      game_stats: {
        Row: {
          assists: number | null
          athlete_id: string | null
          blocks: number | null
          created_at: string | null
          fouls: number | null
          game_id: string | null
          id: string
          points: number | null
          rebounds: number | null
          stat_type: string | null
          stat_value: number | null
          steals: number | null
          turnovers: number | null
          updated_at: string | null
        }
        Insert: {
          assists?: number | null
          athlete_id?: string | null
          blocks?: number | null
          created_at?: string | null
          fouls?: number | null
          game_id?: string | null
          id?: string
          points?: number | null
          rebounds?: number | null
          stat_type?: string | null
          stat_value?: number | null
          steals?: number | null
          turnovers?: number | null
          updated_at?: string | null
        }
        Update: {
          assists?: number | null
          athlete_id?: string | null
          blocks?: number | null
          created_at?: string | null
          fouls?: number | null
          game_id?: string | null
          id?: string
          points?: number | null
          rebounds?: number | null
          stat_type?: string | null
          stat_value?: number | null
          steals?: number | null
          turnovers?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_stats_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athlete_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "game_stats_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string | null
          event_id: string | null
          game_date: string
          id: string
          location: string | null
          status: string | null
          team1_id: string | null
          team1_score: number | null
          team2_id: string | null
          team2_score: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          game_date: string
          id?: string
          location?: string | null
          status?: string | null
          team1_id?: string | null
          team1_score?: number | null
          team2_id?: string | null
          team2_score?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          game_date?: string
          id?: string
          location?: string | null
          status?: string | null
          team1_id?: string | null
          team1_score?: number | null
          team2_id?: string | null
          team2_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_team1_id_fkey"
            columns: ["team1_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_team2_id_fkey"
            columns: ["team2_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      health_records: {
        Row: {
          athlete_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          notes: string | null
          record_date: string
          record_type: string
          updated_at: string | null
        }
        Insert: {
          athlete_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          notes?: string | null
          record_date: string
          record_type: string
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          notes?: string | null
          record_date?: string
          record_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_records_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athlete_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      meal_plans: {
        Row: {
          age_group: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          goal: string | null
          id: string
          meals: Json
          sport: string | null
          title: string
        }
        Insert: {
          age_group?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          goal?: string | null
          id?: string
          meals: Json
          sport?: string | null
          title: string
        }
        Update: {
          age_group?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          goal?: string | null
          id?: string
          meals?: Json
          sport?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      media_analysis: {
        Row: {
          analysis: Json | null
          created_at: string | null
          file_url: string | null
          id: string
          media_asset_id: string | null
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          analysis?: Json | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          media_asset_id?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          analysis?: Json | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          media_asset_id?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_analysis_media_asset_id_fkey"
            columns: ["media_asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_analysis_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          athlete_id: string | null
          id: string
          media_type: string | null
          public_id: string
          tags: string[] | null
          team_id: string | null
          uploaded_at: string | null
          url: string
          user_id: string | null
        }
        Insert: {
          athlete_id?: string | null
          id?: string
          media_type?: string | null
          public_id: string
          tags?: string[] | null
          team_id?: string | null
          uploaded_at?: string | null
          url: string
          user_id?: string | null
        }
        Update: {
          athlete_id?: string | null
          id?: string
          media_type?: string | null
          public_id?: string
          tags?: string[] | null
          team_id?: string | null
          uploaded_at?: string | null
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athlete_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "media_assets_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_assets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mental_health_logs: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          log_date: string
          mood: string | null
          notes: string | null
          stress_level: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          log_date: string
          mood?: string | null
          notes?: string | null
          stress_level?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          log_date?: string
          mood?: string | null
          notes?: string | null
          stress_level?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mental_health_logs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mental_health_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          alert_types: string[] | null
          email_enabled: boolean | null
          sms_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          alert_types?: string[] | null
          email_enabled?: boolean | null
          sms_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          alert_types?: string[] | null
          email_enabled?: boolean | null
          sms_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          athlete_id: string | null
          created_at: string | null
          id: string
          metric_name: string
          metric_type: string
          metric_value: number | null
          notes: string | null
          recorded_by: string | null
          test_date: string
          updated_at: string | null
        }
        Insert: {
          athlete_id?: string | null
          created_at?: string | null
          id?: string
          metric_name: string
          metric_type: string
          metric_value?: number | null
          notes?: string | null
          recorded_by?: string | null
          test_date: string
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string | null
          created_at?: string | null
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number | null
          notes?: string | null
          recorded_by?: string | null
          test_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athlete_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "performance_metrics_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          date_of_birth: string | null
          first_name: string
          gender: string | null
          id: string
          last_name: string
          location: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name: string
          gender?: string | null
          id: string
          last_name: string
          location?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
          location?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      scout_profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          experience_years: number | null
          focus_areas: string[] | null
          organization: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          focus_areas?: string[] | null
          organization?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          experience_years?: number | null
          focus_areas?: string[] | null
          organization?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scout_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stats: {
        Row: {
          created_at: string | null
          date: string
          id: string
          metric_type: string
          source: string
          unit: string | null
          user_id: string | null
          value: number
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          metric_type: string
          source: string
          unit?: string | null
          user_id?: string | null
          value: number
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          metric_type?: string
          source?: string
          unit?: string | null
          user_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      system_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          expires_at: string | null
          id: string
          is_read: boolean | null
          message: string
          priority: number | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          priority?: number | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          priority?: number | null
        }
        Relationships: []
      }
      team_records: {
        Row: {
          draws: number | null
          id: string
          losses: number | null
          team_id: string | null
          updated_at: string | null
          wins: number | null
        }
        Insert: {
          draws?: number | null
          id?: string
          losses?: number | null
          team_id?: string | null
          updated_at?: string | null
          wins?: number | null
        }
        Update: {
          draws?: number | null
          id?: string
          losses?: number | null
          team_id?: string | null
          updated_at?: string | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_records_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          sport: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          sport: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          sport?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      therapy_sessions: {
        Row: {
          counselor_name: string | null
          created_at: string | null
          id: string
          notes: string | null
          outcome: string | null
          session_date: string | null
          topic: string | null
          user_id: string | null
        }
        Insert: {
          counselor_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          outcome?: string | null
          session_date?: string | null
          topic?: string | null
          user_id?: string | null
        }
        Update: {
          counselor_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          outcome?: string | null
          session_date?: string | null
          topic?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "therapy_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_meal_plan_assignments: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          meal_plan_id: string | null
          notes: string | null
          start_date: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          meal_plan_id?: string | null
          notes?: string | null
          start_date?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          meal_plan_id?: string | null
          notes?: string | null
          start_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_meal_plan_assignments_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "meal_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_meal_plan_assignments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string | null
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          role: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          auth_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          last_login?: string | null
          role: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          role?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      workouts: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          intensity: string | null
          scheduled_date: string | null
          title: string
          updated_at: string | null
          user_id: string | null
          workout_type: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          intensity?: string | null
          scheduled_date?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          workout_type?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          intensity?: string | null
          scheduled_date?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          workout_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

