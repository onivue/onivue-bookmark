import BookmarkRow from '@/components/BookMark/BookMarkRow'
import Hero from '@/components/Hero'
import MultiSelect from '@/components/Fields/MultiSelect'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Input from '@/components/Fields/Input'
import { HiPlus } from 'react-icons/hi'
import useBookMarkStore from '@/stores/useBookMarkStore'
import Button from '@/components/Button/Button'
import Modal from '@/components/Modal/Modal'

const options = ['UI', 'Tailwind', 'React', 'Next.js', 'Node.js', 'Github']

export default function Home() {
    const [isAddForm, setIsAddForm] = useState(false)
    const [formValues, setFormValues] = useState({ title: '', url: '', description: '', category: [] })
    const bookMarks = useBookMarkStore((state) => state.bookMarks)
    const getBookMarks = useBookMarkStore((state) => state.getBookMarks)
    const setBookMark = useBookMarkStore((state) => state.setBookMark)

    useEffect(() => {
        let unsubscribe
        const getSubscribe = async () => {
            unsubscribe = getBookMarks()
        }
        getSubscribe()
        return () => {
            // unsubscribe()
        }
    }, [getBookMarks])

    return (
        <div className="relative">
            {/* <Hero /> */}

            {isAddForm ? (
                <div className="mx-auto mb-12 mt-8 grid max-w-2xl gap-12 rounded-xl border bg-slate-50 p-4">
                    <div className="grid gap-4">
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
                    <div className="grid gap-4">
                        <Button
                            style="primary"
                            className="h-12"
                            onClick={() => {
                                setBookMark({ type: 'create', data: formValues })
                                setIsAddForm((s) => !s)
                            }}
                            type="button"
                        >
                            ADD
                        </Button>
                        <Button
                            style="secondary"
                            className="h-12"
                            onClick={() => {
                                setIsAddForm((s) => !s)
                            }}
                            type="button"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="mb-12 mt-8 flex">
                    <Button type="button" className="mx-auto" onClick={() => setIsAddForm((s) => !s)}>
                        <HiPlus className="h-8 w-8" />
                    </Button>
                </div>
            )}
            {/* {JSON.stringify(formValues)}
                <hr />
                {JSON.stringify(bookMarks)} */}

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4">
                {bookMarks.map((b) => {
                    return (
                        <BookmarkRow
                            key={b.id}
                            url={b.url}
                            title={b.title}
                            description={b.description}
                            category={b.category}
                            id={b.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}
