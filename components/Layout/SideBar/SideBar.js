import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { HiMenuAlt2 } from 'react-icons/hi'
import LogoIcon from '@/components/LogoIcon/LogoIcon'
import CategoryManager from '@/components/Category/CategoryManager'

export default function SideBar({ hidden = false, width = '20rem' }) {
    const [sideBarIsOpen, toggleSideBar] = useState(false)
    const ref = useRef(null)
    //MOBILE SIDEBAR TOGGLE HANDLER
    useEffect(() => {
        const handleOutsideClick = (event) => {
            !ref.current?.contains(event.target) && sideBarIsOpen && toggleSideBar(false)
        }
        window.addEventListener('mousedown', handleOutsideClick)
        return () => window.removeEventListener('mousedown', handleOutsideClick)
    }, [sideBarIsOpen, ref])

    if (hidden) return <></>

    return (
        <>
            {sideBarIsOpen ? <SideBarOverlay /> : <SideBarToggleButton toggleSidenav={toggleSideBar} />}

            <SideBarNavigationWrapper sideBarIsOpen={sideBarIsOpen} refProp={ref} width={width}>
                <SideBarLogo />
                <SideBarNavigation />
            </SideBarNavigationWrapper>
        </>
    )
}

export function SideBarNavigation() {
    return <CategoryManager />
}

function SideBarNavigationWrapper(props) {
    return (
        <aside
            className={`fixed top-0 left-0 z-20 h-screen w-80 shrink-0 transform transition-all duration-300 lg:sticky lg:-translate-x-0 ${
                props.sideBarIsOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ width: props.width }}
        >
            <div
                className="flex h-full flex-col overflow-auto bg-white p-4 shadow-xl focus:outline-none"
                ref={props.refProp}
            >
                {props.children}
            </div>
        </aside>
    )
}

function SideBarLogo() {
    return (
        <Link href="/" passHref>
            <div className="mt-5 mb-8 flex justify-center">
                <LogoIcon className="h-12 w-12 cursor-pointer" />
            </div>
        </Link>
    )
}

function SideBarToggleButton(props) {
    return (
        <div className={`fixed bottom-5 right-5 z-50 animate-fade-in items-center space-x-4 lg:hidden`}>
            <button
                onClick={props.toggleSidenav}
                className="hover:text-primary rounded-md bg-primary-50 p-1 ring-primary-200 transition-colors duration-200 hover:bg-primary-100 focus:outline-none focus:ring"
            >
                <HiMenuAlt2 className="h-8 w-8" />
            </button>
        </div>
    )
}
function SideBarOverlay() {
    return (
        <div className="fixed inset-0 z-20 h-screen animate-fade-in bg-gray-500 bg-opacity-40 backdrop-blur-sm backdrop-filter lg:hidden" />
    )
}
