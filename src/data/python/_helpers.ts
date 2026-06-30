import type { LessonQuiz } from '../../types'

export function q(
  id: string,
  question: string,
  options: string[],
  correct: number,
  explanation?: string,
) {
  return { id, question, options, correctIndex: correct, explanation }
}

export function quiz(questions: ReturnType<typeof q>[], xp = 40): LessonQuiz {
  return { questions, passScore: 70, xpReward: xp }
}
