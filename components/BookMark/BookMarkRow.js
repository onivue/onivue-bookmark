/* eslint-disable @next/next/no-img-element */
import useBookMarkStore from '@/stores/useBookMarkStore'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import Modal from '@/components/Modal/Modal'
import EditBookMark from './EditBookMark'

function getFaviconUrl(url) {
    return (
        url &&
        `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${
            url.match('^(?://|[^/]+)*')[0]
        }&size=128`
    )
}

const BookmarkRow = ({ url, description, title, id, category }) => {
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const setBookMark = useBookMarkStore((state) => state.setBookMark)
    const categories = useBookMarkStore((state) => state.categories)
    return (
        <a href={url} target="_blank" rel="noreferrer">
            <div className="relative rounded-xl border border-slate-100 shadow-lg shadow-primary-50 hover:shadow-xl hover:shadow-primary-100  ">
                <div className="flex items-center p-4 pr-20">
                    <div className="h-10 w-10">
                        <img
                            className="h-full w-full rounded-lg bg-primary-50 object-cover"
                            src={getFaviconUrl(url)}
                            alt="favicon"
                            onError={(event) => (event.target.src = '/favicon.ico')}
                        />
                    </div>

                    <div className="ml-3 overflow-hidden">
                        <p className="font-medium text-gray-900">{title}</p>
                        <div
                            className="truncate text-xs text-gray-500"
                            // href={url}
                            // target="_blank"
                            // rel="noreferrer"
                        >
                            {url ? url : <>&nbsp;</>}
                        </div>
                        <p className="truncate text-sm text-gray-500">
                            {description ? description : <>&nbsp;</>}
                        </p>
                    </div>
                </div>
                <div className="absolute top-2 right-2 flex flex-wrap gap-2  ">
                    {category.map((c) => {
                        const catObj = categories.filter((x) => x.id === c)[0]
                        if (!catObj) return
                        return (
                            <div
                                key={c}
                                className="flex max-w-xs items-center gap-1 truncate rounded-lg text-xs text-primary-500"
                            >
                                <div
                                    className="h-1 w-1 rounded-full"
                                    style={{ background: catObj?.color }}
                                ></div>
                                {catObj?.title}
                            </div>
                        )
                    })}
                </div>

                <Modal
                    title="Delete Bookmark"
                    show={showModalDelete}
                    onClose={() => setShowModalDelete(false)}
                    onCancel={() => setShowModalDelete(false)}
                    onSubmit={() => {
                        setBookMark({
                            type: 'delete',
                            docId: id,
                        })
                    }}
                    type="warning"
                ></Modal>

                <EditBookMark
                    values={{ title, description, url, category }}
                    show={showModalEdit}
                    onClose={() => setShowModalEdit(false)}
                    onCancel={() => setShowModalEdit(false)}
                    id={id}
                />
                <div className="absolute bottom-4 right-4 flex cursor-pointer gap-2 px-2 text-lg text-gray-500">
                    <HiOutlinePencil
                        onClick={(e) => {
                            e.preventDefault()
                            setShowModalEdit(true)
                        }}
                    />
                    <HiOutlineTrash
                        onClick={(e) => {
                            e.preventDefault()
                            setShowModalDelete(true)
                        }}
                    />
                </div>
            </div>{' '}
        </a>
    )
}

export default BookmarkRow
