import { useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiCheck, HiChevronDown } from 'react-icons/hi'
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
                    <div className="relative mt-4">
                        <div className="relative">
                            <div className="group">
                                <Listbox.Label
                                    className={`absolute top-3 origin-[0] -translate-y-6  transform text-sm text-gray-500 duration-300  ${
                                        selectedValues.length === 0 ? 'scale-100' : 'scale-75'
                                    }`}
                                >
                                    {label}
                                </Listbox.Label>
                                <Listbox.Button className="w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-left text-sm text-gray-900 focus:border-primary-300 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-primary-500">
                                    {selectedValues.length === 0 ? (
                                        <div className="text-gray-400">&nbsp;</div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2 pr-12">
                                            {selectedValues.map((opt, index) => (
                                                // <span
                                                //     className="mr-1 inline-flex items-center rounded  bg-primary-100 px-1 text-primary-600"
                                                //     key={val.id}
                                                // >
                                                //     {val.title}
                                                // </span>
                                                <div className="flex items-center gap-2" key={opt.id}>
                                                    <div
                                                        className="h-4 w-4 rounded-full border-black"
                                                        style={{ background: opt.color }}
                                                    ></div>
                                                    <div className="mr-1 inline-flex items-center rounded px-1 text-primary-600">
                                                        {opt.title}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <HiChevronDown className="h-5 w-5 text-gray-500" />
                                    </span>
                                </Listbox.Button>
                            </div>
                            <Transition
                                show={open}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="absolute z-10 mt-1 w-full rounded-xl bg-white shadow-lg"
                            >
                                <Listbox.Options
                                    static
                                    className="shadow-xs max-h-52 overflow-auto rounded-xl py-1 text-base leading-6 focus:outline-none"
                                >
                                    {options.map((opt) => (
                                        <Listbox.Option key={opt.id} value={opt}>
                                            {({ selected, active }) => (
                                                <div
                                                    className={`${
                                                        active ? 'bg-primary-400 text-white' : 'text-gray-900'
                                                    } relative cursor-default select-none py-2 pl-8 pr-4`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="h-4 w-4 rounded-full border-black"
                                                            style={{ background: opt.color }}
                                                        ></div>
                                                        <div className="cursor-pointer rounded-lg  px-3 text-primary-800">
                                                            {opt.title}
                                                        </div>
                                                    </div>
                                                    {/* <span
                                                        className={`${
                                                            selected ? 'font-semibold' : 'font-normal'
                                                        } block truncate`}
                                                    >
                                                        {opt.title}
                                                    </span> */}
                                                    {selected && (
                                                        <span
                                                            className={`${
                                                                active ? 'text-white' : 'text-primary-400'
                                                            } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                        >
                                                            <HiCheck className="h-5 w-5" />
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </div>
                )}
            </Listbox>
        </>
    )
}
