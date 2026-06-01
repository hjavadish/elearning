import { useMemo, useState } from 'react'
import type { LessonQuiz, QuizResult } from '../types'
import '../styles/quiz.css'

interface QuizGameProps {
  quiz: LessonQuiz
  onSubmit: (answers: number[]) => Promise<QuizResult>
  onPassed: () => void
}

export function QuizGame({ quiz, onSubmit, onPassed }: QuizGameProps) {
  const [answers, setAnswers] = useState<number[]>(
    Array(quiz.questions.length).fill(-1),
  )
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<QuizResult | null>(null)

  const readyToSubmit = useMemo(
    () => answers.every((answer) => answer >= 0),
    [answers],
  )

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    const next = [...answers]
    next[questionIndex] = optionIndex
    setAnswers(next)
  }

  const handleSubmit = async () => {
    if (!readyToSubmit) {
      setError('لطفاً به همه سوال‌ها پاسخ دهید.')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const quizResult = await onSubmit(answers)
      setResult(quizResult)
      if (quizResult.passed) {
        onPassed()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در ارسال پاسخ')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="quiz-game">
      {quiz.questions.map((question: LessonQuiz['questions'][number], questionIndex: number) => (
        <div className="quiz-question" key={question.id}>
          <p className="quiz-question-text">
            {questionIndex + 1}. {question.question}
          </p>
          <div className="quiz-options">
            {question.options.map((option: string, optionIndex: number) => (
              <button
                key={optionIndex}
                type="button"
                className={`quiz-option ${answers[questionIndex] === optionIndex ? 'selected' : ''}`}
                onClick={() => handleAnswer(questionIndex, optionIndex)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {error && <div className="quiz-error">{error}</div>}
      {result && (
        <div className={`quiz-result ${result.passed ? 'quiz-result--win' : 'quiz-result--lose'}`}>
          <p>
            نتیجه: {result.score}% — {result.passed ? 'قبول شد' : 'ناموفق'}
          </p>
          <p>سؤالات صحیح: {result.correctCount} / {result.totalQuestions}</p>
          <p>XP دریافتی: {result.xpEarned}</p>
        </div>
      )}

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? 'در حال ارسال...' : 'ارسال پاسخ‌ها'}
      </button>
    </div>
  )
}
