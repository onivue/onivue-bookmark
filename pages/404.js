import Button from '@/components/Button/Button'
import Link from 'next/link'

export default function FourOhFour() {
    return (
        <div className="flex flex-1 flex-col justify-center">
            <div className="py-4">
                <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight md:text-6xl">
                    404 - Page Not Found
                </h2>
                <div className="flex justify-center">
                    <Link href="/">
                        <a className="mx-auto ">
                            <Button>Go back</Button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
