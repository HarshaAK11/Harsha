import React, { useRef } from 'react'
import gsap from 'gsap'

const Sidebar = ({ isOpen }) => {

    const sidebarRef = useRef()

    const t1 = gsap.timeline()

    t1.to( sidebarRef.current, {
        height: '100%',
        duration: 0.8,
        ease: "power3.inOut",
    }
    )

    return (
        
        <>
            {isOpen && 
                <div ref={sidebarRef} className='fixed z-50 top-0 left-0 w-full h-0 bg-red-500'>Sidebar</div> || ''
            }
        </>
    
  )
}

export default Sidebar