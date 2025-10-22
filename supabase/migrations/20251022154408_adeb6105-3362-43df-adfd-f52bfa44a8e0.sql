-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assessments table
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  patient_age INTEGER NOT NULL,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'archived')),
  total_score INTEGER,
  success_level INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create assessment_answers table
CREATE TABLE public.assessment_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE NOT NULL,
  question_id INTEGER NOT NULL,
  selected_values JSONB NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_analysis table
CREATE TABLE public.ai_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE NOT NULL UNIQUE,
  analysis_text TEXT NOT NULL,
  risk_factors JSONB DEFAULT '[]'::jsonb,
  positive_factors JSONB DEFAULT '[]'::jsonb,
  personalized_explanation TEXT,
  clinical_recommendations JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create treatment_plans table
CREATE TABLE public.treatment_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE NOT NULL,
  phases JSONB NOT NULL,
  estimated_timeline TEXT,
  implant_type TEXT,
  preparatory_procedures JSONB DEFAULT '[]'::jsonb,
  pre_post_care JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cost_estimates table
CREATE TABLE public.cost_estimates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE NOT NULL,
  total_min DECIMAL(10,2),
  total_max DECIMAL(10,2),
  currency TEXT DEFAULT 'CLP',
  breakdown JSONB NOT NULL,
  financing_options JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pdf_reports table
CREATE TABLE public.pdf_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email_subscriptions table
CREATE TABLE public.email_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdf_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for assessments
CREATE POLICY "Users can view own assessments"
  ON public.assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own assessments"
  ON public.assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments"
  ON public.assessments FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for assessment_answers
CREATE POLICY "Users can view own answers"
  ON public.assessment_answers FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.assessments
    WHERE assessments.id = assessment_answers.assessment_id
    AND assessments.user_id = auth.uid()
  ));

CREATE POLICY "Users can create own answers"
  ON public.assessment_answers FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.assessments
    WHERE assessments.id = assessment_answers.assessment_id
    AND assessments.user_id = auth.uid()
  ));

-- RLS Policies for ai_analysis
CREATE POLICY "Users can view own ai_analysis"
  ON public.ai_analysis FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.assessments
    WHERE assessments.id = ai_analysis.assessment_id
    AND assessments.user_id = auth.uid()
  ));

-- RLS Policies for treatment_plans
CREATE POLICY "Users can view own treatment_plans"
  ON public.treatment_plans FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.assessments
    WHERE assessments.id = treatment_plans.assessment_id
    AND assessments.user_id = auth.uid()
  ));

-- RLS Policies for cost_estimates
CREATE POLICY "Users can view own cost_estimates"
  ON public.cost_estimates FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.assessments
    WHERE assessments.id = cost_estimates.assessment_id
    AND assessments.user_id = auth.uid()
  ));

-- RLS Policies for pdf_reports
CREATE POLICY "Users can view own pdf_reports"
  ON public.pdf_reports FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.assessments
    WHERE assessments.id = pdf_reports.assessment_id
    AND assessments.user_id = auth.uid()
  ));

-- RLS Policy for email_subscriptions (public can insert)
CREATE POLICY "Anyone can subscribe"
  ON public.email_subscriptions FOR INSERT
  WITH CHECK (true);

-- Trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();