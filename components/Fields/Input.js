import { forwardRef } from 'react'
import { HiExclamationCircle } from 'react-icons/hi'

import classNames from 'classnames'

const Input = (
    {
        label,
        placeholder = '',
        helperText = '',
        id,
        type = 'text',
        readOnly = false,
        errors = {},
        dirtyFields = {},
        dot,
        iconRight,
        iconLeft,
        ...rest
    },
    ref,
) => {
    const styleLabel =
        'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-primary-600 dark:text-gray-400 peer-focus:dark:text-primary-500'
    const styleError = 'focus:ring-red-500 border-red-500 focus:border-red-500'
    const styleDisabled = 'opacity-50 focus:ring-gray-300 focus:border-gray-200 cursor-not-allowed'
    const styles = {
        text: {
            base: 'peer',
            active: '',
            disabled: styleDisabled,
            error: styleError,
        },
        file: {
            base: 'p-1 block w-full text-sm text-gray-500 file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 hover:file:ring-2 hover:file:ring-primary-300 ',
            active: 'file:focus:ring-primary-300 file:focus:ring-2 file:focus:border-primary-200 focus:outline-none',
            disabled: styleDisabled,
            error: styleError,
        },
        radio: {
            base: 'rounded-full',
            active: '',
            disabled: styleDisabled,
            error: styleError,
        },
        checkbox: {
            base: '',
            active: '',
            disabled: styleDisabled,
            error: styleError,
        },
        textarea: {
            base: 'h-full peer',
            active: '',
            disabled: 'opacity-50 focus:ring-gray-300 focus:border-gray-200 cursor-not-allowed',
            error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
        },
    }

    const resolveObjectPath = (object, path) => {
        if (Object.keys(object).length !== 0)
            return path
                .replace(/\[/g, '.')
                .replace(/\]/g, '')
                .split('.')
                .reduce((o, k) => (o || {})[k], object)
    }

    return (
        <div className="grid gap-1">
            <div className="relative z-0 flex items-center">
                {type === 'textarea' ? (
                    <textarea
                        {...rest}
                        name={id}
                        id={id}
                        readOnly={readOnly}
                        aria-required={dot}
                        aria-invalid={!!errors[id]}
                        className={classNames(
                            styles.textarea.base,
                            readOnly ? styles.textarea.disabled : errors[id] && styles.textarea.error,
                        )}
                        placeholder={' '}
                        aria-describedby={id}
                        ref={ref}
                    />
                ) : (
                    <input
                        {...rest}
                        type={type}
                        name={id}
                        id={id}
                        aria-required={dot}
                        aria-invalid={!!resolveObjectPath(errors, id)}
                        className={classNames(
                            styles[type]?.base,
                            readOnly
                                ? styles[type]?.disabled
                                : resolveObjectPath(errors, id)
                                ? styles[type]?.error
                                : styles[type]?.active,
                            iconLeft && 'pl-12',
                            iconRight && 'pr-12',
                        )}
                        placeholder={' '}
                        aria-describedby={id}
                        ref={ref}
                        readOnly={readOnly}
                        disabled={readOnly}
                    />
                )}
                {/* LABEL */}

                <label
                    htmlFor={id}
                    className={
                        type === 'text' || type === 'file' || type === 'textarea'
                            ? styleLabel
                            : 'ml-3 text-sm'
                    }
                >
                    {label}
                    {dot && <span className="pl-0.5 text-red-500">*</span>}
                    {dirtyFields[id] && <span className="pl-0.5 text-primary-500">*</span>}
                </label>

                {/* LABEL END */}
                {/* ICONS */}
                {iconLeft && (
                    <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center ">
                        {iconLeft}
                    </div>
                )}

                {(resolveObjectPath(errors, id) || iconRight) && (
                    <div className="absolute inset-y-0 right-0 flex w-12 items-center justify-center ">
                        {resolveObjectPath(errors, id) && (
                            <HiExclamationCircle className="text-xl text-red-500" />
                        )}
                        {iconRight && iconRight}
                    </div>
                )}
                {/* ICONS END */}
            </div>
            {(helperText !== '' || errors[id]?.message) && (
                <div className="grid gap-1">
                    {helperText !== '' && <div className="text-xs text-gray-500">{helperText}</div>}
                    {errors[id] && <span className="text-sm text-red-500">{errors[id].message}</span>}
                </div>
            )}
        </div>
    )
}

export default forwardRef(Input)
