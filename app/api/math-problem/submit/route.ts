import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabase } from '@/lib/supabaseClient'
import type { SubmitAnswerRequest, SubmitAnswerResponse } from '@/lib/types'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(request: Request) {
  try {
    const body: SubmitAnswerRequest = await request.json()
    const { sessionId, userAnswer } = body
    
    if (!sessionId || userAnswer === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Get the problem from the database
    const { data: session, error: sessionError } = await supabase
      .from('math_problem_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Problem session not found' },
        { status: 404 }
      )
    }
    
    // Check if the answer is correct
    const isCorrect = Math.abs(Number(userAnswer) - Number(session.correct_answer)) < 0.01
    
    // Generate personalized feedback using Gemini AI
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' })
    
    const feedbackPrompt = `You are a friendly and encouraging Primary 5 math tutor. Generate personalized feedback for a student who just solved this problem:

Problem: ${session.problem_text}
Correct Answer: ${session.correct_answer}
Student's Answer: ${userAnswer}
Result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}

Guidelines for feedback:
- If correct: Praise the student enthusiastically and briefly explain why their answer is correct
- If incorrect: Be encouraging and supportive. Provide a hint about where they might have gone wrong, and suggest what concept to review. Do NOT give away the full solution directly.
- Keep the feedback concise (2-3 sentences)
- Use age-appropriate language for a Primary 5 student
- Be warm and motivating

Generate ONLY the feedback text (no JSON, no additional formatting):`

    const result = await model.generateContent(feedbackPrompt)
    const response = await result.response
    const feedback = response.text().trim()
    
    // Save the submission to the database
    const { error: submissionError } = await supabase
      .from('math_problem_submissions')
      .insert({
        session_id: sessionId,
        user_answer: Number(userAnswer),
        is_correct: isCorrect,
        feedback_text: feedback,
        hint_used: body.hintUsed || false,
      })
    
    if (submissionError) {
      console.error('Supabase submission error:', submissionError)
      throw new Error('Failed to save submission to database')
    }
    
    const responseData: SubmitAnswerResponse = {
      isCorrect,
      feedback,
      correctAnswer: Number(session.correct_answer),
    }
    
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error submitting answer:', error)
    return NextResponse.json(
      { error: 'Failed to submit answer. Please try again.' },
      { status: 500 }
    )
  }
}

