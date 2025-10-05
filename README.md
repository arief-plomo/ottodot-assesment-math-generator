# AI Math Problem Generator - Assessment Submission

## Overview

This is an AI-powered math problem generator built for the Otto Dot full-stack developer assessment. The application generates math word problems suitable for Primary 5 students using AI, saves problems and submissions to a database, and provides personalized feedback.

## 🔗 Live Demo

**Deployed Application**: [Insert your Vercel deployment URL here]

## Demo Credentials

For reviewers to test the live application:

```
SUPABASE_URL: https://srodqgqstyuicqlppfwu.supabase.co
SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyb2RxZ3FzdHl1aWNxbHBwZnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NDQxNjcsImV4cCI6MjA3NTEyMDE2N30.DCNa7BlppXw_JdFX7byG71gFkrD_bbOHPWnSDuBs2z4
```

## Tech Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: Google Generative AI (Gemini)
- **Deployment**: Vercel

## Core Features

### ✅ Required Features (Assessment Criteria)

- **AI Problem Generation**: Uses Google Gemini AI to generate Primary 5 level math word problems
- **Database Persistence**: All problems and submissions saved to Supabase tables
- **Answer Submission**: Users can submit answers and get immediate feedback
- **AI Feedback**: Personalized feedback generated based on user responses
- **Mobile-Responsive UI**: Clean, modern interface built with Tailwind CSS

### Additional Features Implemented

- **Difficulty Levels**: Easy, Medium, Hard with appropriate complexity scaling
- **Problem Types**: 11 different math topics (Addition, Subtraction, Multiplication, Division, Fractions, Decimals, Percentages, Rate, Area, Volume, Angles)
- **Hints System**: AI-generated hints that guide without revealing answers
- **Step-by-Step Solutions**: Detailed solution explanations for every problem
- **Problem History**: View all previously attempted problems
- **Score Tracking**: Comprehensive analytics dashboard with performance metrics
- **Dark Mode**: Light and dark themes with system preference detection

## How It Works

1. **Generate Problem**: Click "Generate New Problem" to create an AI-generated math word problem
2. **Save to Database**: Problem and correct answer are saved as a new session in Supabase
3. **Submit Answer**: User submits their answer, which is validated and saved to the database
4. **AI Feedback**: Application generates and displays personalized feedback based on the submission

## Database Schema

### Tables Created:
- `math_problem_sessions`: Stores generated problems and correct answers
- `math_problem_submissions`: Stores user submissions linked to problem sessions

## API Endpoints

- `POST /api/math-problem`: Generate new math problems using AI
- `POST /api/math-problem/submit`: Submit answers and get AI-generated feedback

## Singapore Curriculum Alignment

Problems are specifically designed for Primary 5 students following the 2021 Singapore Primary Mathematics Syllabus, covering:
- Number and Algebra (four operations, fractions, decimals, percentages, rate)
- Measurement and Geometry (area, volume, angles)
- Real-world contexts relevant to Primary 5 students

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_API_KEY=your_google_api_key
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

## Deployment

This application is deployed on Vercel with environment variables configured for production use.

## Assessment Requirements Checklist

- ✅ **Tech Stack**: Next.js, TypeScript, Tailwind CSS, Supabase ✓
- ✅ **AI Integration**: Google Gemini for problem generation and feedback ✓
- ✅ **Database**: Two tables with proper relationships ✓
- ✅ **Frontend**: Clean, mobile-responsive interface ✓
- ✅ **Problem Generation**: AI returns JSON with problem_text and final_answer ✓
- ✅ **Answer Submission**: Submissions saved and linked to sessions ✓
- ✅ **Personalized Feedback**: AI-generated feedback based on user responses ✓
- ✅ **Live Deployment**: Deployed on Vercel ✓
- ✅ **Public Repository**: Available on GitHub ✓
- ✅ **Demo Credentials**: Supabase URL and Anon Key provided ✓

## Repository Structure

```
├── app/
│   ├── api/math-problem/
│   │   ├── route.ts          # Problem generation endpoint
│   │   └── submit/route.ts   # Answer submission endpoint
│   ├── page.tsx              # Main application page
│   └── layout.tsx            # Root layout with theme provider
├── components/               # Reusable UI components
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── supabase.ts          # Supabase client
│   └── utils.ts             # Utility functions
├── database.sql             # Database schema and setup
└── README.md               # This file
```

---

**Submission Links:**
- **GitHub Repository**: https://github.com/arief-plomo/ottodot-assesment-math-generator
- **Live Demo**: ottodot-assesment-math-generator.vercel.app
