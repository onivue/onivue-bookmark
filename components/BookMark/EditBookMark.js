import React from 'react'
import Input from '../Fields/Input'
import MultiSelect from '../Fields/MultiSelect'
import { useEffect, useState } from 'react'
import useBookMarkStore from '@/stores/useBookMarkStore'
import Modal from '../Modal/Modal'
import useAuthStore from '@/stores/useAuthStore'

const EditBookMark = ({ values, show, onCancel, onClose, id }) => {
    const [formValues, setFormValues] = useState(values)
    const categories = useBookMarkStore((state) => state.categories)
    const setBookMark = useBookMarkStore((state) => state.setBookMark)
    const { user } = useAuthStore((state) => ({
        user: state.user,
    }))
    return (
        <Modal
            title="Edit Bookmark"
            show={show}
            onClose={onClose}
            onCancel={onCancel}
            onSubmit={() => {
                console.log(formValues)
                console.log(user.uid)
                setBookMark({
                    type: 'update',
                    data: formValues,
                    docId: id,
                    userId: user.uid,
                })
                onClose()
            }}
            type="edit"
        >
            <div className="mt-12 mb-36 grid gap-4">
                <Input
                    type="text"
                    label="Title"
                    placeholder="..."
                    onChange={(e) => {
                        setFormValues({ ...formValues, title: e.target.value })
                    }}
                    value={formValues.title}
                />
                <Input
                    type="text"
                    label="URL"
                    placeholder="https://..."
                    onChange={(e) => {
                        setFormValues({ ...formValues, url: e.target.value })
                    }}
                    value={formValues.url}
                />
                <Input
                    type="textarea"
                    label="Description"
                    placeholder="..."
                    name="description"
                    onChange={(e) => {
                        setFormValues({ ...formValues, description: e.target.value })
                    }}
                    value={formValues.description}
                />
                <MultiSelect
                    options={categories}
                    label="Category"
                    placeholder="please select a category"
                    onChange={(val) => {
                        setFormValues({ ...formValues, category: val.map((v) => v.id) })
                    }}
                    selectedInitialValues={categories.filter((c) =>
                        formValues.category.some((f) => f === c.id),
                    )}
                />
            </div>
        </Modal>
    )
}

export default EditBookMark
