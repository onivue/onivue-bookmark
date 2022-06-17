import Button from '@/components/Button/Button'
import Link from 'next/link'

const Unathorized = () => {
    return (
        <div className="flex h-full flex-1 flex-col items-center justify-center">
            <div className="grid  content-center justify-items-center ">
                <div className="py-4">
                    <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight md:text-6xl">
                        This page is just for authorized Users.
                    </h2>

                    <Link href="/auth/login">
                        <a className="mx-auto mt-12 grid w-1/2 grid-cols-1 gap-4">
                            <Button style="secondary">Login</Button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Unathorized
