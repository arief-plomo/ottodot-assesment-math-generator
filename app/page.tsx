'use client'

import { useState, useEffect } from 'react'
import { FeedbackAnimation } from './components/FeedbackAnimation'
import { MathCard } from './components/MathCard'
import { ProgressBar } from './components/ProgressBar'
import { MobileNavigation } from './components/MobileNavigation'
import { Button } from '@/components/ui/enhanced-button'
import { FloatingInput } from '@/components/ui/floating-input'
import { LoadingSpinner } from './components/loading-spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Brain, 
  Trophy, 
  Star, 
  Lightbulb, 
  Target,
  Zap,
  TrendingUp,
  History
} from 'lucide-react'
import type { 
  MathProblem, 
  GenerateProblemResponse, 
  SubmitAnswerResponse,
  Difficulty,
  ProblemType,
  ProblemSession,
  ScoreStats
} from '@/lib/types'

const DIFFICULTY_OPTIONS: Difficulty[] = ['easy', 'medium', 'hard']
const PROBLEM_TYPES: { value: ProblemType; label: string; icon: string; description: string }[] = [
  { value: 'addition', label: 'Addition', icon: '➕', description: 'Adding numbers together' },
  { value: 'subtraction', label: 'Subtraction', icon: '➖', description: 'Taking away or finding differences' },
  { value: 'multiplication', label: 'Multiplication', icon: '✖️', description: 'Groups of numbers or repeated addition' },
  { value: 'division', label: 'Division', icon: '➗', description: 'Sharing equally or finding how many groups' },
  { value: 'fractions', label: 'Fractions', icon: '🍕', description: 'Parts of a whole, mixed numbers' },
  { value: 'decimals', label: 'Decimals', icon: '💰', description: 'Numbers with decimal points' },
  { value: 'percentages', label: 'Percentages', icon: '📊', description: 'Parts per hundred (%)' },
  { value: 'rate', label: 'Rate', icon: '🏃', description: 'Speed, cost per unit, time problems' },
  { value: 'area', label: 'Area', icon: '⬜', description: 'Space inside shapes (triangles, rectangles)' },
  { value: 'volume', label: 'Volume', icon: '📦', description: 'Space inside 3D shapes (cubes, cuboids)' },
  { value: 'angles', label: 'Angles', icon: '📐', description: 'Measuring angles and angle relationships' },
]


export default function Home() {
  const [problem, setProblem] = useState<MathProblem | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [error, setError] = useState('')
  const [showSolution, setShowSolution] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [problemType, setProblemType] = useState<ProblemType | ''>('')
  const [activeTab, setActiveTab] = useState('practice')
  const [history, setHistory] = useState<ProblemSession[]>([])
  const [stats, setStats] = useState<ScoreStats | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const generateProblem = async () => {
    setIsLoading(true)
    setError('')
    setFeedback('')
    setShowSolution(false)
    setShowHint(false)
    setUserAnswer('')
    setShowFeedback(false)

    try {
      const response = await fetch('/api/math-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty, problemType: problemType || undefined }),
      })

      if (!response.ok) throw new Error('Failed to generate problem')

      const data: GenerateProblemResponse = await response.json()
      console.log('AI Response:', JSON.stringify(data, null, 2))
      setProblem(data.problem)
      setSessionId(data.sessionId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate problem')
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!sessionId) {
      setError('No active problem session. Please generate a problem first.')
      return
    }
    
    if (!userAnswer) {
      setError('Please enter an answer.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/math-problem/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          userAnswer: parseFloat(userAnswer),
          hintUsed: showHint,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit answer')
      }

      setFeedback(data.feedback)
      setIsCorrect(data.isCorrect)
      setShowSolution(true)
      setShowFeedback(true)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/math-problem/history')
      if (!response.ok) throw new Error('Failed to fetch history')
      const data = await response.json()
      setHistory(data.sessions || [])
    } catch (err) {
      console.error('Error fetching history:', err)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/math-problem/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      // Mock enhanced stats if basic stats are available
      const enhancedStats = data ? {
        ...data,
        streak: Math.floor(Math.random() * 5),
        totalXP: data.correct * 10 + (data.accuracy > 80 ? 50 : 0),
        level: Math.floor((data.correct * 10) / 100) + 1,
        streakBest: Math.floor(Math.random() * 8) + 2
      } : null
      setStats(enhancedStats)
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory()
    } else if (activeTab === 'progress') {
      fetchStats()
    }
  }, [activeTab])

  const getLevelFromXP = (xp: number) => Math.floor(xp / 100) + 1
  const getXPProgress = (xp: number) => xp % 100

  return (
    <div className="min-h-screen">
      
      {/* Feedback Animation */}
      <FeedbackAnimation 
        isCorrect={isCorrect}
        show={showFeedback}
        onComplete={() => setShowFeedback(false)}
      />
      
      {/* Header */}
      <header 
        id="navigation"
        className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40"
        role="banner"
        aria-label="Math Adventure header"
      >
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Math Problem Generator
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Primary 5 Singapore Mathematics
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            {stats && (
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                  <Star className="h-4 w-4 text-orange-500" />
                  <span className="font-semibold">Level {getLevelFromXP(stats.totalXP || 0)}</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{stats.accuracy}%</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold">{stats.streak || 0}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main 
        id="main-content" 
        className="container max-w-6xl mx-auto px-4 py-8 pb-24 lg:pb-8"
        role="main"
        aria-label="Math practice application"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Enhanced Tab Navigation */}
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
            <TabsTrigger
              value="practice" 
              className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline font-semibold">Practice</span>
            </TabsTrigger>
            <TabsTrigger
              value="progress" 
              className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline font-semibold">Score Tracking</span>
            </TabsTrigger>
            <TabsTrigger
              value="history" 
              className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline font-semibold">History</span>
            </TabsTrigger>
          </TabsList>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Settings Card */}
            <MathCard 
              title="🎯 Choose Your Challenge!"
              subtitle="Select difficulty and topic to start practicing"
              animated
            >
              <div className="space-y-6">
                {/* Difficulty Selection */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    Difficulty Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {DIFFICULTY_OPTIONS.map((diff) => (
                      <Button
                        key={diff}
                        variant={difficulty === diff ? 'default' : 'outline'}
                        className={`h-12 font-semibold ${
                          difficulty === diff 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : ''
                        }`}
                        onClick={() => setDifficulty(diff)}
                      >
                        {diff === 'easy' && '🟢'} {diff === 'medium' && '🟡'} {diff === 'hard' && '🔴'}
                        <span className="ml-2">{diff.charAt(0).toUpperCase() + diff.slice(1)}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Topic Selection */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    Math Topic
                  </label>
                  <select
                    value={problemType}
                    onChange={(e) => setProblemType(e.target.value as ProblemType | '')}
                    className="w-full p-3 text-base sm:text-lg border-2 border-slate-200 focus:border-blue-500 rounded-xl bg-white text-black dark:border-slate-700 dark:focus:border-blue-400 appearance-none cursor-pointer"
                  >
                    <option value="">🎲 Any Topic</option>
                    {PROBLEM_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Button 
                  onClick={generateProblem} 
                  disabled={isLoading}
                  loading={isLoading}
                  loadingText="Creating Your Problem..."
                  variant="gradient"
                  size="xl"
                  animation="glow"
                  icon={<Brain className="h-5 w-5" />}
                  className="w-full"
                >
                  Generate New Problem! ✨
                </Button>
              </div>
            </MathCard>

            {/* Problem Card */}
            {problem && (
              <MathCard 
                difficulty={problem.difficulty}
                title="🧠 Problem Challenge!"
                animated
              >
                <div className="space-y-6">
                  {/* Problem Text */}
                  <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900">
                        <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-lg leading-relaxed font-medium">{problem.problem_text}</p>
                    </div>
                  </div>

                  {/* Hint Section */}
                  {problem.hint && !showSolution && (
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => setShowHint(!showHint)}
                        className="gap-2 text-orange-500 font-semibold"
                      >
                        <Lightbulb className="h-5 w-5" />
                        {showHint ? 'Hide Hint 🙈' : 'Need a Hint? 💡'}
                      </Button>
                      {showHint && (
                        <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
                          <Lightbulb className="h-4 w-4 text-orange-500" />
                          <AlertDescription className="text-orange-700 dark:text-orange-300 font-medium">
                            💡 {problem.hint}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}

                  {/* Answer Form */}
                  {!showSolution && (
                    <form onSubmit={submitAnswer} className="space-y-4">
                      <FloatingInput
                        type="number"
                        step="any"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        label="Your Answer 🎯"
                        placeholder="Enter your answer here..."
                        variant="filled"
                        size="lg"
                        className="text-center font-semibold"
                        required
                      />
                      <Button 
                        type="submit" 
                        disabled={!userAnswer || isLoading}
                        loading={isLoading}
                        loadingText="Checking Your Answer..."
                        variant="success"
                        size="xl"
                        animation="bounce"
                        className="w-full"
                      >
                        Submit Answer! 🚀
                      </Button>
                    </form>
                  )}
                </div>
              </MathCard>
            )}

            {/* Feedback Card */}
            {feedback && (
              <MathCard 
                className={isCorrect ? "border-green-300 bg-green-50 dark:bg-green-900/20" : "border-orange-300 bg-orange-50 dark:bg-orange-900/20"}
                title={isCorrect ? "🎉 Amazing Work!" : "💪 Keep Trying!"}
                animated
              >
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed">{feedback}</p>
                  
                  {problem?.step_by_step_solution && (
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                      <h4 className="text-lg font-bold flex items-center gap-2 mb-4">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        Solution Steps 📋
                      </h4>
                      <div className="space-y-3">
                        {problem.step_by_step_solution.split('\n').map((line, index) => (
                          <div key={index} className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <p className="flex-1 leading-relaxed pt-1">{line}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={generateProblem}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-colors"
                    disabled={isLoading}
                  >
                    Try Another Problem! 🎁
                  </Button>
                </div>
              </MathCard>
            )}
          </TabsContent>

          {/* Score Tracking Tab */}
          <TabsContent value="progress">
            <div className="space-y-6">
              {stats ? (
                <MathCard title="📊 Your Score Tracking Dashboard" animated>
                  <div className="space-y-6">
                    {/* Level Progress */}
                    <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <ProgressBar
                        current={getXPProgress(stats.totalXP || 0)}
                        max={100}
                        label={`Level ${getLevelFromXP(stats.totalXP || 0)} Progress`}
                        color="blue"
                        icon="⭐"
                      />
                      <p className="text-sm text-muted-foreground mt-2 text-center">
                        {100 - getXPProgress(stats.totalXP || 0)} XP until Level {getLevelFromXP(stats.totalXP || 0) + 1}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: "Total Problems", value: stats.total, color: "blue", icon: "📚" },
                        { label: "Correct", value: stats.correct, color: "green", icon: "✅" },
                        { label: "Accuracy", value: `${stats.accuracy}%`, color: "purple", icon: "🎯" },
                        { label: "Current Streak", value: stats.streak || 0, color: "orange", icon: "🔥" }
                      ].map((stat, index) => (
                        <div key={index} className="text-center p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                          <div className="text-2xl mb-1">{stat.icon}</div>
                          <div className="text-3xl font-bold">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Difficulty Progress */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold">Progress by Difficulty 🎯</h3>
                      <div className="space-y-3">
                        <ProgressBar current={stats.easyProblems} max={20} label="Easy Problems" color="green" icon="🟢" />
                        <ProgressBar current={stats.mediumProblems} max={15} label="Medium Problems" color="orange" icon="🟡" />
                        <ProgressBar current={stats.hardProblems} max={10} label="Hard Problems" color="red" icon="🔴" />
                      </div>
                    </div>
                  </div>
                </MathCard>
              ) : (
                <MathCard title="📊 Loading Your Stats..." animated>
                  <div className="text-center py-12">
                    <LoadingSpinner size="lg" />
                    <p className="text-lg text-muted-foreground mt-4">Calculating your progress...</p>
                  </div>
                </MathCard>
              )}
            </div>
          </TabsContent>


          {/* History Tab */}
          <TabsContent value="history">
            <MathCard title="📚 Problem History" animated>
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <History className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                  <p className="text-lg text-muted-foreground">No problems solved yet!</p>
                  <p className="text-sm text-muted-foreground">Start practicing to see your history here</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {history.slice(0, 10).map((session) => (
                    <div key={session.id} className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{session.difficulty}</Badge>
                          {session.problem_type && <Badge variant="outline">{session.problem_type}</Badge>}
                          {session.submission?.is_correct ? (
                            <Badge className="bg-green-500">✅ Correct</Badge>
                          ) : session.submission && (
                            <Badge variant="destructive">❌ Try Again</Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(session.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{session.problem_text}</p>
                      {session.submission && (
                        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                          Your answer: {session.submission.user_answer} | Correct: {session.correct_answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </MathCard>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  )
}