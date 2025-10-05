import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabase } from '@/lib/supabaseClient'
import type { GenerateProblemRequest, GenerateProblemResponse, MathProblem } from '@/lib/types'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(request: Request) {
  try {
    const body: GenerateProblemRequest = await request.json()
    const difficulty = body.difficulty || 'medium'
    const problemType = body.problemType

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'AI not configured. Missing GOOGLE_API_KEY.' },
        { status: 500 }
      )
    }

    // Build prompt for Primary 5 Singapore Mathematics Curriculum
    const allowedOperations = [
      'addition',
      'subtraction',
      'multiplication',
      'division',
      'fractions',
      'decimals',
      'percentages',
      'rate',
      'area',
      'volume',
      'angles',
    ]

    const operationLine = problemType && allowedOperations.includes(problemType)
      ? `Topic: ${problemType}`
      : 'Topic: choose any Primary 5 Singapore Mathematics topic.'

    const difficultyHints: Record<string, string> = {
      easy: 'Use simple numbers and single-step problems. For fractions: proper fractions with denominators up to 10. For decimals: up to 2 decimal places.',
      medium: 'Use moderate complexity. For fractions: mixed numbers, addition/subtraction of unlike fractions. For geometry: basic shapes and measurements.',
      hard: 'Use challenging problems. For fractions: multiplication/division, complex mixed numbers. For geometry: composite shapes, multi-step calculations.',
    }

    const prompt = `You are a Primary 5 Mathematics teacher following the 2021 Singapore Mathematics Syllabus. Create a word problem appropriate for Primary 5 students (ages 10-11).

Constraints:
- ${operationLine}
- Difficulty: ${difficulty} (${difficultyHints[difficulty] || ''})
- Create realistic, Singapore-context scenarios (HDB flats, void decks, hawker centres, MRT, school events, etc.)
- The final answer must be a single number (integer or decimal). No units in the final_answer field.

Topic-specific guidelines:
- Addition/Subtraction: Whole numbers up to 100,000, decimals to 3 decimal places
- Multiplication/Division: Up to 4-digit by 2-digit, with decimals
- Fractions: Proper fractions, mixed numbers, addition/subtraction of unlike fractions, simple multiplication/division
- Decimals: Operations with decimals to 3 decimal places, conversion between fractions and decimals
- Percentages: Finding percentages of quantities, expressing fractions as percentages
- Rate: Simple rate problems (speed = distance/time, cost per unit)
- Area: Triangles (1/2 × base × height), rectangles, composite shapes
- Volume: Cubes and cuboids (length × width × height)
- Angles: Angles on a straight line (180°), at a point (360°), vertically opposite angles

Additionally provide:
- A very short helpful hint (one sentence, appropriate for Primary 5 level)
- Step-by-step solution in 2-4 concise steps, each on a new line

Output STRICTLY as a single JSON object with keys: problem_text, final_answer, hint, step_by_step_solution. Do not include markdown fences.

Available topics: ${allowedOperations.join(', ')}.`

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' })
    const result = await model.generateContent(prompt)
    const aiText = (await result.response.text()).trim()

    console.log('Raw AI Response:', aiText)

    // Attempt to parse JSON robustly
    const jsonString = extractJson(aiText)
    console.log('Extracted JSON:', jsonString)
    const parsed = JSON.parse(jsonString)
    console.log('Parsed Object:', JSON.stringify(parsed, null, 2))

    // Basic validation/coercion
    if (!parsed || typeof parsed.problem_text !== 'string') {
      throw new Error('AI response missing problem_text')
    }
    if (parsed.final_answer === undefined || parsed.final_answer === null || isNaN(Number(parsed.final_answer))) {
      throw new Error('AI response missing or invalid final_answer')
    }

    const problem: MathProblem = {
      problem_text: parsed.problem_text,
      final_answer: Number(parsed.final_answer),
      difficulty,
      problem_type: problemType,
      hint: typeof parsed.hint === 'string' ? parsed.hint : undefined,
      step_by_step_solution: typeof parsed.step_by_step_solution === 'string' ? parsed.step_by_step_solution : undefined,
    }

    // Save to Supabase
    const { data: inserted, error: insertError } = await supabase
      .from('math_problem_sessions')
      .insert({
        problem_text: problem.problem_text,
        correct_answer: problem.final_answer,
        difficulty,
        problem_type: problemType,
        hint: problem.hint || null,
        step_by_step_solution: problem.step_by_step_solution || null,
      })
      .select('*')
      .single()

    if (insertError || !inserted) {
      console.error('Supabase insert error:', insertError)
      throw new Error('Failed to save problem session to database')
    }

    const responseData: GenerateProblemResponse = {
      sessionId: inserted.id,
      problem,
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error generating math problem:', error)
    return NextResponse.json(
      { error: 'Failed to generate problem. Please try again.' },
      { status: 500 }
    )
  }
}

// Extract JSON object from model text response (handles stray prose or fences)
function extractJson(text: string): string {
  // If already looks like JSON
  if (text.trim().startsWith('{') && text.trim().endsWith('}')) return text.trim()

  // Try to find the first { ... } block
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1)
  }
  // Fallback minimal JSON
  return JSON.stringify({ problem_text: text, final_answer: 0 })
}
