export type Difficulty = 'easy' | 'medium' | 'hard'

export type ProblemType = 
  // Basic Operations
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division'
  // Fractions and Decimals (Primary 5 Singapore)
  | 'fractions'
  | 'decimals'
  | 'percentages'
  // Advanced Topics (Primary 5 Singapore)
  | 'rate'
  | 'area'
  | 'volume'
  | 'angles'

export interface MathProblem {
  problem_text: string
  final_answer: number
  difficulty?: Difficulty
  problem_type?: ProblemType
  hint?: string
  step_by_step_solution?: string
}

export interface GenerateProblemResponse {
  sessionId: string
  problem: MathProblem
}

export interface GenerateProblemRequest {
  difficulty?: Difficulty
  problemType?: ProblemType
}

export interface SubmitAnswerRequest {
  sessionId: string
  userAnswer: number
  hintUsed?: boolean
}

export interface SubmitAnswerResponse {
  isCorrect: boolean
  feedback: string
  correctAnswer: number
}

export interface ProblemSession {
  id: string
  created_at: string
  problem_text: string
  correct_answer: number
  difficulty: Difficulty
  problem_type: ProblemType
  hint?: string
  step_by_step_solution?: string
  submission?: {
    is_correct: boolean
    user_answer: number
    hint_used: boolean
  }
}

export interface ScoreStats {
  total: number
  correct: number
  incorrect: number
  accuracy: number
  easyProblems: number
  mediumProblems: number
  hardProblems: number
  streak: number
  totalXP: number
  level: number
  streakBest: number
}


export interface StudentProgress {
  streak: number
  totalXP: number
  level: number
  streakBest: number
}

