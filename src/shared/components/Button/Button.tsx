import React from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary_dark' | 'tertiary_light'
type ButtonState = '' | 'selected'
type IconPosition = 'left' | 'right' | 'only' | 'none'
type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
type Rounded = 'none' | 'md' | 'lg' | 'full'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  state?: ButtonState
  icon?: React.ReactNode
  iconPosition?: IconPosition
  size?: ButtonSize
  loading?: boolean
  rounded?: Rounded
  fullWidth?: boolean
  className?: string
  children?: React.ReactNode
}

const ButtonSizeClasses: Record<ButtonSize, string> = {
  xs: '',
  sm: '',
  base: '',
  lg: '',
  xl: '',
}

const ButtonVariantClasses: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary_dark: styles['tertiary-dark'],
  tertiary_light: styles['tertiary-light'],
}

const ButtonRoundedClasses: Record<Rounded, string> = {
  none: '',
  md: '',
  lg: '',
  full: '',
}
function Button({
  variant = 'primary',
  icon,
  iconPosition = 'none',
  size = 'base',
  loading = false,
  rounded = 'md',
  fullWidth = false,
  children,
  className,
  state = '',
  ...props
}: ButtonProps) {
  const sizeClass = ButtonSizeClasses[size]
  const variantClass = ButtonVariantClasses[variant]
  const roundedClass = ButtonRoundedClasses[rounded]
  const stateClass = state ? styles[`${variant}_${state}`] : ''
  const fullWidthClass = fullWidth ? 'w-full' : ''
  const basicClass = styles.button
  return (
    <button
      className={`${basicClass} ${sizeClass} ${variantClass} ${stateClass} ${roundedClass} ${fullWidthClass} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {iconPosition !== 'only' && children}
      {loading && <div>Loading....</div>}
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}

export default Button
