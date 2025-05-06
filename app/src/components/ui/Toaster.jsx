import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import gsap from 'gsap'

const Toaster = ({  title, description, time = 3 }) => {

    const toast = useRef(null)
    const [visible, setVisible] = useState(true)

    useEffect(() => {

        if(!toast.current) return

        gsap.fromTo(toast.current, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power1.in' }
        )

        const timer = setTimeout(() => {
            gsap.to(toast.current, {
                opacity: 0,
                duration: 0.5,
                y: 20,
                ease: 'power1.out',
                onComplete: () => {
                    setVisible(false)
                }
            })
        }, time * 1000)

        return() => clearTimeout(timer)

    }, [time])

    if(!visible) return null

    return (
        <div ref={toast} className={`absolute bottom-6 right-6 w-[400px] h-[100px] border border-gray-700 shadow-md flex items-center justify-between gap-x-8 rounded-lg bg-green-500 text-white p-4 z-60`}>
            <p>{title}</p>
            <p className='text-sm'>{description}</p> 
            <X  className='absolute top-2 right-2 size-4 cursor-pointer hover:text-red-500' onClick={() => setVisible(false)} />
        </div>
    )
}

export default Toaster