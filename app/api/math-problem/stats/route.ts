import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import type { ScoreStats } from '@/lib/types'

export async function GET() {
  try {
    // Fetch all submissions
    const { data: submissions, error: submissionsError } = await supabase
      .from('math_problem_submissions')
      .select(`
        is_correct,
        math_problem_sessions (
          difficulty
        )
      `)
    
    if (submissionsError) {
      throw submissionsError
    }
    
    if (!submissions || submissions.length === 0) {
      const emptyStats: ScoreStats = {
        total: 0,
        correct: 0,
        incorrect: 0,
        accuracy: 0,
        easyProblems: 0,
        mediumProblems: 0,
        hardProblems: 0,
        streak: 0,
        totalXP: 0,
        level: 1,
        streakBest: 0,
      }
      return NextResponse.json(emptyStats)
    }
    
    // Calculate statistics
    const total = submissions.length
    const correct = submissions.filter((s: any) => s.is_correct).length
    const incorrect = total - correct
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
    
    // Count by difficulty
    const easyProblems = submissions.filter(
      (s: any) => s.math_problem_sessions?.difficulty === 'easy'
    ).length
    const mediumProblems = submissions.filter(
      (s: any) => s.math_problem_sessions?.difficulty === 'medium'
    ).length
    const hardProblems = submissions.filter(
      (s: any) => s.math_problem_sessions?.difficulty === 'hard'
    ).length
    
    const stats: ScoreStats = {
      total,
      correct,
      incorrect,
      accuracy,
      easyProblems,
      mediumProblems,
      hardProblems,
      streak: Math.floor(Math.random() * 5), // Mock streak for demo
      totalXP: correct * 10,
      level: Math.floor((correct * 10) / 100) + 1,
      streakBest: Math.floor(Math.random() * 8) + 2,
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}

