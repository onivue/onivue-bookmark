/* eslint-disable @next/next/no-img-element */
import { HiOutlinePencil } from 'react-icons/hi'

function getFaviconUrl(url) {
    return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${
        url.match('^(?://|[^/]+)*')[0]
    }&size=128`
}

const BookmarkRow = ({ url, description, title }) => {
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
                    <p className="truncate text-sm text-gray-500">{description} &nbsp;</p>
                    <a
                        className="truncate pt-1 text-xs text-gray-500"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {url}
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
