import classNames from 'classnames'
import React from 'react'

// interface to declare all our prop types
type Props = {
    children: React.ReactNode
    onClick?: () => void
    variant?: string // default, primary, info, success, warning, danger, dark
    size?: string // sm, md, lg
    disabled?: boolean
    style?: string
    rounded?: boolean
    className?: string
    [rest: string]: any // ...rest
}

const styleBase = classNames(
    'font-bold align-bottom cursor-pointer transition duration-150 focus:outline-none items-center justify-center',
)

const styleDisabled = classNames('opacity-50 cursor-not-allowed')

const styles = {
    primary: {
        base: 'bg-primary-300 text-primary-700',
        active: 'active:bg-primary-400 hover:bg-primary-400 focus:ring focus:ring-primary-400',
    },
    secondary: {
        base: 'text-primary-600 bg-primary-100',
        active: 'active:bg-primary-200 hover:bg-primary-200 focus:ring focus:ring-primary-300',
    },
}
const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-lg',
}
export const Button: React.FunctionComponent<Props> = ({
    style = 'primary',
    rounded = false,
    size,
    disabled,
    className = '',
    children,
    onClick,
    ...rest
}: Props) => (
    <button
        {...rest}
        disabled={disabled}
        className={classNames(
            className,
            styleBase,
            rounded ? 'rounded-full' : 'rounded-xl',
            sizes[size] || sizes.md,
            styles[style].base || styles.primary,
            disabled ? styleDisabled : styles[style].active,
        )}
        onClick={onClick}
    >
        {children}
    </button>
)

export default Button
