import BookmarkRow from '@/components/BookMark/BookMarkRow'
import MultiSelect from '@/components/Fields/MultiSelect'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Input from '@/components/Fields/Input'
import { HiPlus, HiFilter } from 'react-icons/hi'
import useBookMarkStore from '@/stores/useBookMarkStore'
import Button from '@/components/Button/Button'
import useAuthStore from '@/stores/useAuthStore'

export default function Home() {
    const [isAddForm, setIsAddForm] = useState(false)
    const [formValues, setFormValues] = useState({ title: '', url: '', description: '', category: [] })
    const bookMarks = useBookMarkStore((state) => state.bookMarks)
    const getBookMarks = useBookMarkStore((state) => state.getBookMarks)
    const setBookMark = useBookMarkStore((state) => state.setBookMark)
    const getCategories = useBookMarkStore((state) => state.getCategories)
    const categories = useBookMarkStore((state) => state.categories)
    const filterCategory = useBookMarkStore((state) => state.filterCategory)
    const setFilterCategory = useBookMarkStore((state) => state.setFilterCategory)
    const { user } = useAuthStore()
    useEffect(() => {
        let unsubscribe
        if (user) {
            const getSubscribe = async () => {
                unsubscribe = getBookMarks({ userId: user.uid })
            }
            getSubscribe()

            return () => {
                unsubscribe()
            }
        }
    }, [getBookMarks, filterCategory, user])

    useEffect(() => {
        if (user) {
            let unsubscribe
            const getSubscribe = async () => {
                unsubscribe = getCategories({ userId: user.uid })
            }
            getSubscribe()

            return () => {
                unsubscribe()
            }
        }
    }, [getCategories, user])

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
                            options={categories}
                            label="Category"
                            placeholder="please select a category"
                            onChange={(val) => {
                                setFormValues({ ...formValues, category: val.map((v) => v.id) })
                            }}
                        />
                    </div>
                    <div className="grid gap-4">
                        <Button
                            style="primary"
                            className="h-12"
                            onClick={() => {
                                setBookMark({ type: 'create', data: formValues, userId: user.uid })
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
                    <Button
                        style="secondary"
                        type="button"
                        className="mx-auto"
                        onClick={() => setIsAddForm((s) => !s)}
                    >
                        <HiPlus className="h-8 w-8" />
                    </Button>
                </div>
            )}
            {/* 
                <hr />
                {JSON.stringify(bookMarks)} */}
            {/* {JSON.stringify(formValues)} */}

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4">
                <div>
                    <div className="flex flex-wrap gap-2">
                        {filterCategory.length > 0 && (
                            <HiFilter
                                className="h-4 w-4 cursor-pointer text-gray-300 hover:text-primary-400"
                                onClick={() => setFilterCategory([])}
                            />
                        )}
                        {categories.map((c) => {
                            if (!filterCategory.includes(c.id)) return
                            return (
                                <div
                                    key={c.id}
                                    className="flex max-w-xs items-center gap-1 truncate rounded-lg text-xs text-slate-800"
                                >
                                    <div
                                        className="h-2 w-2 rounded-full border border-slate-500"
                                        style={{ background: c?.color }}
                                    ></div>
                                    {c?.title}
                                </div>
                            )
                        })}
                    </div>
                </div>
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
