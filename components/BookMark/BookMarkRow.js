/* eslint-disable @next/next/no-img-element */
import useBookMarkStore from '@/stores/useBookMarkStore'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import Modal from '@/components/Modal/Modal'

function getFaviconUrl(url) {
    return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${
        url.match('^(?://|[^/]+)*')[0]
    }&size=128`
}

const BookmarkRow = ({ url, description, title, id }) => {
    const [showModal, setShowModal] = useState(false)
    const setBookMark = useBookMarkStore((state) => state.setBookMark)
    return (
        <div className="relative rounded-xl border shadow-lg shadow-primary-50  ">
            <div className="flex items-center p-4 pr-16">
                <a href={url} target="_blank" rel="noreferrer">
                    <div className="h-10 w-10">
                        <img
                            className="h-full w-full rounded-lg bg-primary-50 object-cover ring-2 ring-primary-200"
                            src={getFaviconUrl(url)}
                            alt="favicon"
                            onError={(event) => (event.target.src = '/favicon.ico')}
                        />
                    </div>
                </a>
                <div className="ml-3 overflow-hidden">
                    <p className="font-medium text-gray-900">{title}</p>
                    <a
                        className="truncate pt-1 text-xs text-gray-500"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {url}
                    </a>
                    <p className="truncate text-sm text-gray-500">{description} &nbsp;</p>
                </div>
            </div>
            <div className="absolute top-2 right-2 max-w-xs truncate rounded-lg bg-primary-100 px-2 text-xs text-primary-500">
                category
            </div>

            <Modal
                title="Delete Bookmark"
                show={showModal}
                onClose={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
                onSubmit={() => {
                    setBookMark({
                        type: 'delete',
                        docId: id,
                    })
                }}
                type="warning"
            ></Modal>
            <div className="absolute bottom-4 right-4 flex cursor-pointer gap-2 px-2 text-lg text-gray-500">
                <HiOutlinePencil />
                <HiOutlineTrash onClick={(e) => setShowModal(true)} />
            </div>
        </div>
    )
}

export default BookmarkRow
