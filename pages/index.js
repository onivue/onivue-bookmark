import BookmarkRow from '@/components/BookMark/BookMarkRow'
import Hero from '@/components/Hero'
import MultiSelect from '@/components/Fields/MultiSelect'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Input from '@/components/Fields/Input'
import { HiPlus } from 'react-icons/hi'

const options = ['UI', 'Tailwind', 'React', 'Next.js', 'Node.js', 'Github']

export default function Home() {
    const [isAddForm, setIsAddForm] = useState(false)
    const [formValues, setFormValues] = useState({ title: '', url: '', description: '', category: [] })
    return (
        <div className="relative">
            {/* <Hero /> */}
            <div className="mx-auto my-12 grid max-w-2xl gap-12">
                {isAddForm ? (
                    <>
                        <div className="grid gap-2">
                            <Input
                                type="text"
                                label="Title"
                                placeholder="..."
                                onChange={(e) => {
                                    setFormValues({ ...formValues, title: e.target.value })
                                }}
                            />
                            <Input
                                type="text"
                                label="URL"
                                placeholder="https://..."
                                onChange={(e) => {
                                    setFormValues({ ...formValues, url: e.target.value })
                                }}
                            />
                            <Input
                                type="textarea"
                                label="Description"
                                placeholder="..."
                                name="description"
                                onChange={(e) => {
                                    setFormValues({ ...formValues, description: e.target.value })
                                }}
                            />
                            <MultiSelect
                                options={options}
                                label="Category"
                                placeholder="please select a category"
                                onChange={(val) => {
                                    setFormValues({ ...formValues, category: val })
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            className="h-12 rounded-xl bg-primary-300 font-bold text-primary-700"
                            onClick={() => setIsAddForm((s) => !s)}
                        >
                            ADD
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        className="mx-auto flex h-12 w-20 items-center justify-center rounded-xl bg-primary-200 font-bold text-primary-700"
                        onClick={() => setIsAddForm((s) => !s)}
                    >
                        <HiPlus className="h-8 w-8" />
                    </button>
                )}
                {JSON.stringify(formValues)}
            </div>

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4">
                <BookmarkRow />
                <BookmarkRow />
                <BookmarkRow />
                <BookmarkRow />
                <BookmarkRow />
                <BookmarkRow />
            </div>
        </div>
    )
}
