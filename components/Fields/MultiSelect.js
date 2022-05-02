import React, { useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'

// const testOptions = ['UI', 'Tailwind', 'React', 'Next.js', 'Node.js', 'GitHub']

export default function MultiSelect({ options, selectedInitialValues = [], label, onChange, placeholder }) {
    const [selectedValues, setSelectedValues] = useState(selectedInitialValues)

    return (
        <>
            <Listbox
                as="div"
                className="mx-auto w-full space-y-1"
                value={selectedValues}
                onChange={(e) => {
                    onChange(e)
                    setSelectedValues(e)
                }}
                multiple
            >
                {({ open }) => (
                    <>
                        <Listbox.Label className="text-sm font-medium text-gray-700">{label}</Listbox.Label>
                        <div className="relative">
                            <span className="">
                                <Listbox.Button
                                    className="focus:shadow-outline-blue t ext-left relative flex w-full cursor-default 
                                flex-wrap gap-x-1 gap-y-2 rounded-xl border border-gray-300 bg-white py-2 pl-3
                                pr-10 transition duration-150 ease-in-out focus:border-primary-300 
                                focus:outline-none"
                                >
                                    {selectedValues.length === 0 ? (
                                        <div className="text-gray-400">{placeholder}</div>
                                    ) : (
                                        selectedValues.map((val, index) => (
                                            <span
                                                className="mr-1 inline-flex items-center rounded  bg-primary-100 px-1 text-primary-600"
                                                key={index}
                                            >
                                                {val}
                                            </span>
                                        ))
                                    )}

                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path
                                                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </Listbox.Button>
                            </span>

                            <Transition
                                show={open}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="absolute z-10 mt-1 w-full rounded-xl bg-white shadow-lg"
                            >
                                <Listbox.Options
                                    static
                                    className="shadow-xs max-h-60 overflow-auto rounded-xl py-1 text-base leading-6 focus:outline-none"
                                >
                                    {options.map((opt) => (
                                        <Listbox.Option key={opt} value={opt}>
                                            {({ selected, active }) => (
                                                <div
                                                    className={`${
                                                        active ? 'bg-primary-400 text-white' : 'text-gray-900'
                                                    } relative cursor-default select-none py-2 pl-8 pr-4`}
                                                >
                                                    <span
                                                        className={`${
                                                            selected ? 'font-semibold' : 'font-normal'
                                                        } block truncate`}
                                                    >
                                                        {opt}
                                                    </span>
                                                    {selected && (
                                                        <span
                                                            className={`${
                                                                active ? 'text-white' : 'text-primary-400'
                                                            } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                        >
                                                            <svg
                                                                className="h-5 w-5"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </>
    )
}