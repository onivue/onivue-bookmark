/* eslint-disable @next/next/no-img-element */
import { HiOutlinePencil } from 'react-icons/hi'

function getFaviconUrl(url) {
    return `${url.match('^(?://|[^/]+)*')[0]}/favicon.ico`
}

const BookmarkRow = () => {
    return (
        <div className="relative rounded-lg  shadow-lg ">
            <div className="flex items-center p-4 pr-16">
                <a href="https://www.google.ch/" target="_blank" rel="noreferrer">
                    <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={getFaviconUrl('https://www.google.ch/')}
                        alt="favicon"
                    />
                </a>
                <div className="ml-3 overflow-hidden">
                    <p className="font-medium text-gray-900">Google</p>
                    <p className="truncate text-sm text-gray-500">Description</p>
                    <a
                        className="truncate pt-1 text-xs text-gray-500"
                        href="https://www.google.ch/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        https://www.google.ch/
                    </a>
                </div>
            </div>
            <div className="absolute top-2 right-2 max-w-xs truncate rounded-lg bg-primary-100 px-2 text-xs text-primary-500">
                category
            </div>
            <div className="absolute bottom-4 right-4 cursor-pointer px-2 text-lg text-gray-500">
                <HiOutlinePencil />
            </div>
        </div>
    )
}

export default BookmarkRow
