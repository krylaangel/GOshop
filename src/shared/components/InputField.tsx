import React from 'react'

type InputState = 'none' | 'error' | 'success' | 'special'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  state?: InputState
  error?: string
}

function InputField({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  state = 'none',
  error,
  ...props
}: InputFieldProps) {
  const stateClass = state !== 'none' ? ` __${state}` : ''

  return (
    <div className={`input-field ${stateClass}`}>
      <input
        className={`input-field-base
        ${error && value ? 'error__field' : 'input-field-styles'}`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={name}
        {...props}
      />
      {error && <p className="error__auth">{error}</p>}
    </div>
  )
}

export default InputField
