import useBookMarkStore from '@/stores/useBookMarkStore'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { HiPlus } from 'react-icons/hi'
import Modal from '../Modal/Modal'
import Input from '../Fields/Input'

const CategoryManager = ({}) => {
    const categories = useBookMarkStore((state) => state.categories)

    const setCategory = useBookMarkStore((state) => state.setCategory)
    const [showModal, setShowModal] = useState(false)
    const [formValues, setFormValues] = useState({ title: '', color: 'black' })

    return (
        <nav className="flex flex-col gap-8">
            <div>
                <h2 className="mb-4 font-bold">Category Manager</h2>
                <div className="flex flex-col gap-2 text-zinc-700">
                    {categories.map((c) => {
                        return (
                            <div className="flex items-center gap-2" key={c.id}>
                                <div
                                    className="h-4 w-4 rounded-full border-black"
                                    style={{ background: c.color }}
                                ></div>
                                <div className="cursor-pointer rounded-lg bg-primary-100 py-1 px-3 text-primary-800">
                                    {c.title}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Modal
                title="Delete Bookmark"
                show={showModal}
                onClose={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
                onSubmit={() => {
                    setCategory({
                        type: 'create',
                        data: formValues,
                    })
                    setShowModal(false)
                    setFormValues({ title: '', color: 'black' })
                }}
                type="edit"
            >
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
                        type="color"
                        label="Color"
                        placeholder="..."
                        onChange={(e) => {
                            setFormValues({ ...formValues, color: e.target.value })
                        }}
                    />
                </div>
            </Modal>
            <div
                className="flex cursor-pointer justify-center"
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <HiPlus className="h-6 w-6 text-slate-400" />
            </div>
        </nav>
    )
}

export default CategoryManager
