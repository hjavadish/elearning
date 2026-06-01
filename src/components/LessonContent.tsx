import { PythonPlayground } from './PythonPlayground'
import type { LessonSection } from '../types'

export function LessonContent({
  sections,
  enablePlayground = false,
}: {
  sections: LessonSection[]
  enablePlayground?: boolean
}) {
  return (
    <div className="lesson-content">
      {sections.map((section, i) => {
        if (section.type === 'playground') {
          return (
            <section key={i} className="lesson-block lesson-block--playground">
              <PythonPlayground
                initialCode={section.content}
                title={section.title}
                mockInputs={section.mockInputs}
                tests={section.tests}
              />
            </section>
          )
        }

        if (enablePlayground && section.type === 'code') {
          return (
            <section key={i} className="lesson-block lesson-block--playground">
              {section.title && <h3>{section.title}</h3>}
              <PythonPlayground
                initialCode={section.content}
                mockInputs={section.mockInputs}
                tests={section.tests}
              />
            </section>
          )
        }

        return (
          <section
            key={i}
            className={`lesson-block lesson-block--${section.type}`}
          >
            {section.title && <h3>{section.title}</h3>}
            {section.type === 'code' ? (
              <pre dir="ltr" className="code-block">
                <code>{section.content}</code>
              </pre>
            ) : (
              <p>{section.content}</p>
            )}
          </section>
        )
      })}
    </div>
  )
}
