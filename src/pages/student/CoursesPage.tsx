import { Navigate } from 'react-router-dom'
import { PYTHON_COURSE_SLUG } from '../../config/brand'

/** Redirects to the Python learning path — single-course app. */
export function CoursesPage() {
  return <Navigate to={`/student/courses/${PYTHON_COURSE_SLUG}`} replace />
}
