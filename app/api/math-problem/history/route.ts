import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import type { ProblemSession } from '@/lib/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // Fetch recent sessions with their submissions
    const { data: sessions, error } = await supabase
      .from('math_problem_sessions')
      .select(`
        *,
        math_problem_submissions (
          user_answer,
          is_correct,
          hint_used
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching history:', error)
      throw new Error('Failed to fetch problem history')
    }
    
    // Format the response
    const formattedSessions: ProblemSession[] = sessions.map((session: any) => ({
      id: session.id,
      created_at: session.created_at,
      problem_text: session.problem_text,
      correct_answer: session.correct_answer,
      difficulty: session.difficulty,
      problem_type: session.problem_type,
      hint: session.hint,
      step_by_step_solution: session.step_by_step_solution,
      submission: session.math_problem_submissions?.[0] || null,
    }))
    
    return NextResponse.json({ sessions: formattedSessions })
  } catch (error) {
    console.error('Error in history route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    )
  }
}

