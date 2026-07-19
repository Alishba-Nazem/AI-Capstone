import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  children: ReactNode
}

export function FormField({ id, label, hint, error, children }: FieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error ? <p className="field-hint">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
}

export function TextInput({ id, className = '', ...props }: TextInputProps) {
  return <input id={id} className={`text-input ${className}`.trim()} {...props} />
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
}

export function TextArea({ id, className = '', ...props }: TextAreaProps) {
  return <textarea id={id} className={`text-input text-area ${className}`.trim()} {...props} />
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
}

export function SelectInput({ id, className = '', children, ...props }: SelectInputProps) {
  return (
    <select id={id} className={`text-input select-input ${className}`.trim()} {...props}>
      {children}
    </select>
  )
}

interface ToggleProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
}

export function Toggle({ id, checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="toggle-row">
      <div className="toggle-copy">
        <label htmlFor={id}>{label}</label>
        {description ? <p className="field-hint">{description}</p> : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        className={`toggle ${checked ? 'toggle--on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="toggle-thumb" />
      </button>
    </div>
  )
}
