import React from 'react'

type InputState = 'none' | 'error' | 'success' | 'special'

interface BaseProps {
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  state?: InputState
  error?: string
  className?: string
}

interface InputFieldProps extends BaseProps {
  type?: string
  multiline?: false
}

interface TextAreaFieldProps extends BaseProps {
  multiline: true
  rows?: number
}

type Props = InputFieldProps | TextAreaFieldProps

function InputField(props: Props) {
  const { name, placeholder, value, onChange, state = 'none', error } = props
  const stateClass = state !== 'none' ? ` __${state}` : ''

  return (
    <div className={`input-field ${stateClass}`}>
      {props.multiline
        ? (
            <textarea
              className={`input-field-base ${error && value ? 'error__field' : 'input-field-styles'} resize-none`}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              rows={props.rows ?? 4}
            />
          )
        : (
            <input
              className={`input-field-base ${error && value ? 'error__field' : 'input-field-styles'}`}
              name={name}
              type={props.type ?? 'text'}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              autoComplete={name}
            />
          )}
      {error && <p className="error__auth">{error}</p>}
    </div>
  )
}

export default InputField
