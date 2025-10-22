export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_analysis: {
        Row: {
          analysis_text: string
          assessment_id: string
          clinical_recommendations: Json | null
          created_at: string | null
          id: string
          personalized_explanation: string | null
          positive_factors: Json | null
          risk_factors: Json | null
        }
        Insert: {
          analysis_text: string
          assessment_id: string
          clinical_recommendations?: Json | null
          created_at?: string | null
          id?: string
          personalized_explanation?: string | null
          positive_factors?: Json | null
          risk_factors?: Json | null
        }
        Update: {
          analysis_text?: string
          assessment_id?: string
          clinical_recommendations?: Json | null
          created_at?: string | null
          id?: string
          personalized_explanation?: string | null
          positive_factors?: Json | null
          risk_factors?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_analysis_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: true
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_answers: {
        Row: {
          assessment_id: string
          created_at: string | null
          id: string
          question_id: number
          score: number
          selected_values: Json
        }
        Insert: {
          assessment_id: string
          created_at?: string | null
          id?: string
          question_id: number
          score: number
          selected_values: Json
        }
        Update: {
          assessment_id?: string
          created_at?: string | null
          id?: string
          question_id?: number
          score?: number
          selected_values?: Json
        }
        Relationships: [
          {
            foreignKeyName: "assessment_answers_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          patient_age: number
          patient_name: string
          status: string | null
          success_level: number | null
          total_score: number | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          patient_age: number
          patient_name: string
          status?: string | null
          success_level?: number | null
          total_score?: number | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          patient_age?: number
          patient_name?: string
          status?: string | null
          success_level?: number | null
          total_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      cost_estimates: {
        Row: {
          assessment_id: string
          breakdown: Json
          created_at: string | null
          currency: string | null
          financing_options: Json | null
          id: string
          total_max: number | null
          total_min: number | null
        }
        Insert: {
          assessment_id: string
          breakdown: Json
          created_at?: string | null
          currency?: string | null
          financing_options?: Json | null
          id?: string
          total_max?: number | null
          total_min?: number | null
        }
        Update: {
          assessment_id?: string
          breakdown?: Json
          created_at?: string | null
          currency?: string | null
          financing_options?: Json | null
          id?: string
          total_max?: number | null
          total_min?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cost_estimates_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      email_subscriptions: {
        Row: {
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          subscribed_at: string | null
        }
        Insert: {
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      pdf_reports: {
        Row: {
          assessment_id: string
          file_name: string
          file_url: string
          generated_at: string | null
          id: string
        }
        Insert: {
          assessment_id: string
          file_name: string
          file_url: string
          generated_at?: string | null
          id?: string
        }
        Update: {
          assessment_id?: string
          file_name?: string
          file_url?: string
          generated_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pdf_reports_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      treatment_plans: {
        Row: {
          assessment_id: string
          created_at: string | null
          estimated_timeline: string | null
          id: string
          implant_type: string | null
          phases: Json
          pre_post_care: Json | null
          preparatory_procedures: Json | null
        }
        Insert: {
          assessment_id: string
          created_at?: string | null
          estimated_timeline?: string | null
          id?: string
          implant_type?: string | null
          phases: Json
          pre_post_care?: Json | null
          preparatory_procedures?: Json | null
        }
        Update: {
          assessment_id?: string
          created_at?: string | null
          estimated_timeline?: string | null
          id?: string
          implant_type?: string | null
          phases?: Json
          pre_post_care?: Json | null
          preparatory_procedures?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "treatment_plans_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
