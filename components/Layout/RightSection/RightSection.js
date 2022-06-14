import { useState, useEffect } from 'react'

const RightSection = () => {
    return (
        <div className="fixed right-0 top-16 hidden h-[calc(100vh-5rem)] w-64 gap-4 overflow-auto pt-4 pr-4 pl-2 xl:block">
            <h2 className="mb-4 font-bold text-primary-500">Right Section</h2>
            <div className="flex flex-col gap-y-4">
                <div className="cursor-pointer">
                    <span className="text-sm">21.04.2022</span>
                    <h3 className="text-md font-semibold">Lorem ipsum dolor sit amet, consectetur adip</h3>
                </div>
                <div className="cursor-pointer">
                    <span className="text-sm">18.04.2022</span>
                    <h3 className="text-md font-semibold">Lorem ipsum dolor sit amet, consectetur adip</h3>
                </div>
            </div>
        </div>
    )
}

export default RightSection
