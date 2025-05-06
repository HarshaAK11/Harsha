import React, { useLayoutEffect, useRef } from 'react'
import Navbar from './Navbar'
import heroImage from '../assets/images/hero-image.jpg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Dock, DockIcon } from "./ui/dock"
import './../index.css'

const HeroSection = () => {

    gsap.registerPlugin(ScrollTrigger)

    // Add refs for animated elements
    const mainTextRef = useRef(null)
    const subTextRef = useRef(null)
    const bottomTextRef = useRef(null)
    const socialRef = useRef(null)
    const curtainRefs = useRef([])

    useLayoutEffect(() => {
        const tl = gsap.timeline()
        
        // Split text into characters
        const mainChars = mainTextRef.current.querySelectorAll('span')
        const subChars = subTextRef.current.querySelectorAll('span')

        //Curtain animation
        tl.to(curtainRefs.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power3.inOut",
            stagger: 0.08,
        })
        .to('.curtain-container', {
            zIndex: -1,
            duration: 0,
            immediateRender: false
        })
        
        //Navbar
        /*
        tl.fromTo(navRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power1.inOut' },
            "-=0.5"
        )*/

        //Main text
        .fromTo(mainChars,
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.5, 
                stagger: 0.03,
                ease: 'power1.inOut'
            },
            '<'
        )

        //Sub text
        .fromTo(subChars,
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.4, 
                stagger: 0.03,
                ease: 'power1.inOut'
            },
            '<'
        )

        //Bottom text
        .fromTo(bottomTextRef.current,
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1,
                duration: 0.4, 
                ease: 'power1.inOut'
            },
            '<'
        )

        //Social
        .fromTo(socialRef.current,
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1,
                duration: 0.4, 
                ease: 'power1.inOut'
            },
            '<'
        )
        
        .fromTo('.hero-bg', 
            { transform: 'scale(1.2)'},
            {
                transform: 'scale(1)',
                duration: 0.5,
                ease: 'power1.inOut'
            },
            '=-0.5'
        )

        //hero-bg
        gsap.to('.hero-bg', {
            y: '30%',
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero-section',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
        });

        const animationValue = window.innerWidth < 768

        //Quote to right
        gsap.to('.right', {
            x: animationValue ? '5%' : '10%',
            ease: 'power2.inOut',
            scrollTrigger: {

                trigger: '.container',
                start: 'top% top%',
                end: 'bottom top',
                scrub: 1,
            },
        })

        //Quote to left
        gsap.to('.left', {
            x: animationValue ? '-5%' : '-10%',
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: '.container',
                start: 'top% top%',
                end: 'bottom top',
                scrub: 1,
            },
        })

        return () => {
            tl.kill()
        }

        
    }, [])

    return (
        <>
            <div className=' hero-section relative w-full h-screen text-[#D9D9D9] overflow-hidden'>

                {/*Curtain*/}
                <div className='fixed w-full h-screen z-10 curtain-container'>
                    {[
                        { bg: '#313131', zIndex: 13 },
                        { bg: '#575757', zIndex: 12 },
                        { bg: 'grey', zIndex: 11 }
                    ].map((item, index) => (
                        <div 
                            key={index}
                            ref={el => curtainRefs.current[index] = el}
                            className='absolute w-full h-screen top-0'
                            style={{ 
                                backgroundColor: item.bg,
                                zIndex: item.zIndex 
                            }}
                        ></div>
                    ))}
                </div>

                <div className='hero-bg absolute h-screen w-full bg-cover' style={{backgroundImage: `url(${heroImage})`}}></div>
                {/*
                <div ref={navRef}>
                    <Navbar />
                </div>*/}
                
                {/*Main text*/}
                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <h1 ref={mainTextRef} className='font font-[800] leading-none tracking-[-10px] whitespace-nowrap xl:text-[15rem] md:text-[10rem] sm:text-[8rem] max-xs:text-[5rem] max-xs:tracking-[-5px]'>
                        {'HARSHA'.split('').map((char, i) => (
                            <span key={i} className='inline-block'>{char}</span>
                        ))}
                        <span className="relative left-5 max-xs:left-2">,</span>
                    </h1>
                    <h1 ref={subTextRef} className='cursive-font leading-none text-end translate-x-[-50px] translate-y-[-30px] md:text-[4rem] sm:text-[3rem] sm:translate-x-[-20px] sm:translate-y-[-10px] max-xs:text-[2rem] max-xs:translate-x-[-15px] max-xs:translate-y-[-5px]'>
                        {'Adithya Kumar'.split('').map((char, i) => (
                            <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
                        ))}
                    </h1>
                </div>
                
                {/*Bottom text*/}
                <div className='font absolute bottom-[50px] left-1/2 translate-x-[-50%] leading-[18px] font-[600] text-center'> 
                    <div ref={bottomTextRef}>
                        WEBDESIGNER<br/>& DEVELOPER
                    </div>
                    <div ref={socialRef}>

                        <Dock direction="middle">
                            <DockIcon title="GitHub" onClick={() => window.open('https://github.com/HarshaAK11', '_blank')}>
                                <Icons.gitHub />
                            </DockIcon>
                            <DockIcon title="Gmail" onClick={() => window.open('mailto:harshaadithyakumar@gmail.com', '_blank')}>
                                <Icons.gmail />
                            </DockIcon>
                            <DockIcon title="LinkedIn" onClick={() => window.open('https://www.linkedin.com/in/harsha-a-k-a8775631b/', '_blank')}>
                                <Icons.linkedin />
                            </DockIcon>
                            <DockIcon title='Instagram' onClick={() => window.open('https://www.instagram.com/harsh__ine/', '_blank')}>
                                <Icons.instagram />
                            </DockIcon>
                        </Dock>
                    </div>
                </div>

            </div>

            {/*Quote*/}
            <div className='container max-w-full xl:h-[120vh] md:h-[100vh] sm:h-[80vh] max-xs:h-[50vh] w-full bg-[#D9D9D9] flex flex-col justify-center items-center xl:leading-[100px] md:leading-[80px] sm:leading-[60px] max-xs:leading-none font-[900] xl:text-[7rem] md:text-[5.5rem] sm:text-[3.8rem] max-xs:text-[2.3rem] overflow-hidden'>
                <h1 className='right font mr-[40%]'>CRAFTING</h1>
                <h1 className='left cursive-font mr-[5%]'>Timeless</h1>
                <h1 className='font ml-[40%] max-xs:ml-[30%]'>WEBSITES</h1>
                <h1 className='left font ml-[10%]'>THAT SPEAKS FOR</h1>
                <h1 className='right cursive-font ml-[30%] max-xs:ml-[10%]'>Your Brand</h1>
            </div>
        </>
    )
}

const Icons = {
    gitHub: (props) => (
      <svg viewBox="0 0 438.549 438.549" {...props}>
        <path
          fill="currentColor"
          d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
        ></path>
      </svg>
    ),
    instagram: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
    gmail: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    linkedin: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
}


export default HeroSection