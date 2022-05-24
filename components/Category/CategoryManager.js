import useBookMarkStore from '@/stores/useBookMarkStore'
import { useState } from 'react'
import { HiPlus } from 'react-icons/hi'
import Modal from '@/components/Modal/Modal'
import Input from '@/components/Fields/Input'
import { HiOutlinePencil, HiOutlineTrash, HiX } from 'react-icons/hi'

const CategoryManager = ({}) => {
    const categories = useBookMarkStore((state) => state.categories)
    const setCategory = useBookMarkStore((state) => state.setCategory)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [categoryToDelete, setCategoryToDelete] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [formValues, setFormValues] = useState({ title: '', color: 'black' })

    return (
        <nav className="flex flex-col gap-8">
            <div>
                <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className="font-bold">Category Manager</h2>
                    {isEdit ? (
                        <HiX
                            className="h-5 w-5 cursor-pointer text-slate-400"
                            onClick={() => setIsEdit(!isEdit)}
                        />
                    ) : (
                        <HiOutlinePencil
                            className="h-5 w-5 cursor-pointer text-slate-400"
                            onClick={() => setIsEdit(!isEdit)}
                        />
                    )}
                </div>
                <div className="flex flex-col gap-2 text-zinc-700">
                    {categories.map((c) => {
                        return (
                            <div key={c.id}>
                                {!isEdit ? (
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-4 w-4 shrink-0 rounded-full border-black"
                                            style={{ background: c.color }}
                                        ></div>
                                        <div className="w-full cursor-pointer rounded-lg py-1 px-3 text-primary-800 hover:bg-primary-50">
                                            {c.title}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <Input
                                            type="color"
                                            onChange={(e) => {
                                                setCategory({
                                                    type: 'update',
                                                    docId: c.id,
                                                    data: { ...c.data, color: e.target.value },
                                                })
                                            }}
                                            value={c.color}
                                        />
                                        <Input
                                            type="text"
                                            onChange={(e) => {
                                                setCategory({
                                                    type: 'update',
                                                    docId: c.id,
                                                    data: { ...c.data, title: e.target.value },
                                                })
                                            }}
                                            value={c.title}
                                        />
                                        <HiOutlineTrash
                                            className="h-5 w-5 cursor-pointer text-slate-400"
                                            onClick={() => {
                                                setCategoryToDelete(c)
                                                setShowModalDelete(true)
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            <Modal
                title="Delete Category"
                show={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                onCancel={() => setShowModalDelete(false)}
                onSubmit={() => {
                    setCategory({
                        type: 'delete',
                        docId: categoryToDelete.id,
                    })
                    setShowModalDelete(false)
                }}
                type="warning"
            ></Modal>
            <Modal
                title="Add Category"
                show={showModalAdd}
                onClose={() => setShowModalAdd(false)}
                onCancel={() => setShowModalAdd(false)}
                onSubmit={() => {
                    setCategory({
                        type: 'create',
                        data: formValues,
                    })
                    setShowModalAdd(false)
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
                    setShowModalAdd(true)
                }}
            >
                <HiPlus className="h-6 w-6 text-slate-400" />
            </div>
        </nav>
    )
}

export default CategoryManager
