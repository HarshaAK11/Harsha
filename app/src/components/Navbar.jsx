import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './../index.css'

const Navbar = () => {

    const links = [
        { name: 'Home', link: 'home' },
        { name: 'About', link: 'about' },
        { name: 'Services', link: 'services' },
        { name: 'Contact', link: 'footer' }
    ]

    const navRef = useRef(null)
    const parentRef = useRef(null)
    const topDivRef = useRef(null)
    const bottomDivRef = useRef(null)
    const linkRefs = useRef([])
    const curtainRefs = useRef([])
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false)
    const [ showLinks, setShowLinks ] = useState(true)
    const sidebarRef = useRef(null)
    const navLinksRef = useRef(null)
    const sidebarTimeline = useRef(null)

    useLayoutEffect(() => {

        //Navbar entry animation
        gsap.fromTo(navRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, delay: 0.8, ease: 'power1.inOut' },
        )

        // Initializing sidebar timeline
        sidebarTimeline.current = gsap.timeline({ paused: true });
        
        if (sidebarRef.current) {
            gsap.set(sidebarRef.current, { y: "100%" });
        }

        // Navlinks positioning
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {

                    if (window.scrollY <= 50) {
                        setShowLinks(true);
                    } else {
                        setShowLinks(false);
                    }
                    
                    lastScrollY = window.scrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        // Handle window resize for responsive animations
        const handleResize = () => {
            
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            if (sidebarTimeline.current) {
                sidebarTimeline.current.kill();
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        }
    }, [])



    //Enter menu
    const handleMenuEnter = () => {
        gsap.to(topDivRef.current, { x: '-130%', duration: 0.5, ease: 'power1.in' })
        gsap.to(bottomDivRef.current, { x: '130%', duration: 0.5, ease: 'power1.in' })
    }

    //Exit menu
    const handleMenuLeave = () => {
        gsap.to(topDivRef.current, { x: '0%', duration: 0.5, ease:'power1.out' })
        gsap.to(bottomDivRef.current, { x: '0%', duration: 0.5, ease:'power1.out' })
    }

    //Enter links
    const handleLinks = (index) => {
        const chars = linkRefs.current[index].querySelectorAll("span");
        const tl = gsap.timeline();
    
        // Animate letters upwards 
        tl.to(chars, {
            y: -8,
            opacity: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "back.in(1.7)" 
        })
        
        // Quick reset
        .set(chars, {
            y: 8,
            opacity: 0,
        })
        .to(chars, {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.15,
            ease: "back.out(1.7)" 
        });
    };

    //Exit links
    const handleExitLinks = (index) => {
        const chars = linkRefs.current[index].querySelectorAll('span')
        const tl = gsap.timeline()

        tl.to(chars, {
            y: 8,
            opacity: 0,
            stagger: 0.02,
            duration: 0.15,
            ease: "back.in(1.7)",
        })
        .set(chars, {
            y: -8,
            opacity: 0,
        })
        .to(chars, {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.15,
            ease: "back.out(1.7)",
        });     
    }

      // Mouse enter effect on social icon in contact form
      const handleIconHover = (e) => {
        gsap.to(e.currentTarget, {
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out"
        });
      };
    
      // Mouse leave effect on social icon in contact form
      const handleIconLeave = (e) => {
        gsap.to(e.currentTarget, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

       // Mouse enter effect on close button
        const handleCloseHover = (e) => {
          gsap.to(e.currentTarget, {
            scale: 0.9,
            duration: 0.3,
            ease: "power2.out"
          });
        };
      
        // Mouse leave effect on close button
        const handleCloseLeave = (e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        // Open Sidebar
        const handleOpenSidebar = () => {
            setIsSidebarOpen(true);
            
            // Then animate it
            gsap.to(sidebarRef.current, {
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            });
        }

        // Close Sidebar
        const handleCloseSidebar = () => {
            gsap.to(sidebarRef.current, {
                y: "100%",
                duration: 0.6,
                ease: "power2.in",
                onComplete: () => {
                    setIsSidebarOpen(false);
                }
            });
        }

        // Scroll cancel and resume
        const scrollHandling = () => {
            isSidebarOpen ? window.LocomotiveScroll.start() : window.LocomotiveScroll.stop()
        }

         // Link hover animation
        const handleLinkEnter = (index) => {
            const link = document.querySelector(`.link-${index}`);
            
            // Get responsive animation values based on screen width
            const animationValue = getResponsiveAnimationValue()
            
            gsap.to(link, {
                y: -animationValue.hoverDistance,
                duration: 0.5,
            });
        }

        // Link leave animation
        const handleLinkLeave = (index) => {
            const link = document.querySelector(`.link-${index}`);
            gsap.to(link, {
                y: 0,
                duration: 0.5,
            });
        }
        
        //  Get responsive animation values
        const getResponsiveAnimationValue = () => {
            const width = window.innerWidth;
            
            // Responsive values for different screen sizes
            if (width >= 1280) {
                // xl screens
                return { hoverDistance: 130 };
            } else if (width >= 1024) {
                // lg screens
                return { hoverDistance: 90 };
            } else if (width >= 768) {
                // md screens
                return { hoverDistance: 45 };
            } else if (width >= 640) {
                // sm screens
                return { hoverDistance: 45 };
            } else {
                // xs and smaller screens
                return { hoverDistance: 45 };
            }
        }

    return (
        <div>
            {/* Navbar */}
            <nav ref={navRef} className='fixed top-0 left-0 w-full font text-white flex mr-10 z-40 px-8 mix-blend-difference'>

                <div className='w-full h-[80px] z-10 flex justify-end items-center gap-10'>
                    <p className={`mr-5 max-md:hidden transition-opacity duration-300 ${showLinks ? 'opacity-100' : 'opacity-0'}`}>+ Based on India</p>
                    {/* Links */}
                    <div 
                        ref={navLinksRef}
                        className={`nav-links flex gap-10 max-md:hidden transition-opacity duration-300 ${showLinks ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {links.map((link, index) => (
                            <a
                                href={`#${link.link}`}
                                key={index}
                                className="relative overflow-hidden text-white cursor-pointer"
                                onMouseEnter={() => handleLinks(index)}
                                onMouseLeave={() => handleExitLinks(index)}
                                ref={(el) => (linkRefs.current[index] = el)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(link.link)?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                }}
                            >
                                {link.name.split("").map((char, i) => (
                                    <span
                                        key={i}
                                        className="inline-block"
                                        style={{ display: "inline-block", transform: "translateY(0)" }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </a>
                        ))}
                    </div>

                    {/*Stick*/}
                    <div 
                        className={`w-[1px] h-4 bg-[rgba(255,255,255,0.5)] max-md:hidden transition-opacity duration-300 ${showLinks ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => {
                            handleOpenSidebar()
                        }}
                    >
                    </div>

                    {/*Menu*/}
                    <div 
                        ref={parentRef} 
                        className='h-2 w-[68px] relative cursor-pointer overflow-hidden mix-blend-difference'
                        onMouseEnter={handleMenuEnter}
                        onMouseLeave={handleMenuLeave}
                        title='Menu'
                        onClick={() => {handleOpenSidebar(), scrollHandling()}}
                    >
                        <div ref={topDivRef} className='absolute w-full top-0 left-0 flex gap-5 flex-nowrap'>
                            <div className='min-w-full h-[1px] bg-white'></div>
                            <div className='min-w-full h-[1px] bg-white'></div>
                        </div>

                        <div ref={bottomDivRef} className='absolute w-full bottom-0 left-[-130%] flex gap-5 flex-nowrap'>
                            <div className='min-w-full h-[1px] bg-white'></div>
                            <div className='min-w-full h-[1px] bg-white'></div>
                        </div>
                    </div>

                </div>
            </nav>

            {/* Sidebar */}
            <div 
                className="sidebar fixed top-0 left-0 w-full h-screen bg-[#1D1D1D] z-50 
                flex md:flex-row sm:flex-col max-xs:flex-col items-center gap-6 
                xl:px-20 lg:px-10 sm:px-10 max-xs:px-10 md:py-20 sm:py-10 max-xs:py-20 text-[#D9D9D9]"
                ref={sidebarRef}
            >
    
                {/*Left side*/}
                <div className='font font-[900] flex flex-col 
                xl:text-9xl lg:text-8xl md:text-5xl sm:text-5xl max-xs:text-5xl 
                xl:px-24 lg:px-20 md:px-0 md:py-0 sm:py-20 max-xs:py-10 
                sm:items-center max-xs:items-center md:text-right sm:text-center max-xs:text-center space-y-10 z-40'>
                    {links.map((link, index) => (
                        <a 
                            key={index} 
                            href={`#${link.link}`}
                            className='relative xl:h-[120px] lg:h-[90px] md:h-[45px] sm:h-[45px] max-xs:h-[45px] 
                            xl:w-[650px] lg:w-[500px] md:w-[400px] sm:w-fit max-xs:w-fit cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault()
                                handleCloseSidebar()
                                scrollHandling()
                                
                                setTimeout(() => {
                                    document.getElementById(link.link)?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                }, 600);
                            }}
                        >
                            <div className='h-full w-full overflow-hidden md:tracking-[-5px] sm:tracking-[0px]'>
                                <div className={`link-${index}`}
                                     onMouseEnter={() => handleLinkEnter(index)} 
                                    onMouseLeave={() => handleLinkLeave(index)}>
                                    <p className='uppercase'>{link.name.split("").map((char, i) => (
                                    <span
                                        key={i}
                                        className="inline-block"
                                    >
                                        {char}
                                    </span>
                                ))}</p>
                                    <p className='cursive-font mr-7'>{link.name}</p>
                                </div>
                            </div>
                            <div className='absolute -bottom-0 -right-6'>
                                <sub className='cursive-font xl:text-5xl lg:text-4xl md:text-3xl text-[rgba(255,255,255,0.3)]'>0{index + 1}</sub>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Vertical line */}
                <div className='w-1 h-full bg-[rgba(255,255,255,0.3)] ml-14 z-40 md:block sm:hidden max-xs:hidden'></div>

                {/* Horizontal line - removed ml-14 to fix unnecessary left gap */}
                <div className='w-full h-1 bg-[rgba(255,255,255,0.3)] z-40 md:hidden sm:block'></div>
            
                {/*Right side*/}
                <div className='w-full h-full flex md:items-end sm:items-center max-xs:items-center justify-center p-4 z-40'>
                    <div className='flex flex-col gap-6 md:items-end sm:items-center max-xs:items-center'>
                        <a href='mailto:harshaadithyakumar@gmail.com' className='relative inline-block after:content-[""] after:absolute after:w-full after:h-[1px] after:bg-[#D9D9D9] after:left-0 after:bottom-0 hover:after:w-0 hover:after:left-auto hover:after:right-0 after:transition-all after:duration-300'>harshaadithyakumar@gmail.com</a>

                        {/* Icons */}
                        <div className='flex gap-5'>

                            {/*instagram*/}
                            <div 
                                className='nav-instagramIcon bg-[#D9D9D9] rounded-full p-2 cursor-pointer'
                                onClick={() => window.open('https://www.instagram.com/harsh__ine/', '_blank')}
                                onMouseEnter={handleIconHover}
                                onMouseLeave={handleIconLeave}

                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                </svg>
                            </div>


                            {/*github*/}
                            <div 
                            className='nav-githubIcon bg-[#D9D9D9] rounded-full p-2 cursor-pointer'
                            onClick={() => window.open('https://github.com/HarshaAK11', '_blank')}

                            onMouseEnter={handleIconHover}
                            onMouseLeave={handleIconLeave}
                            >
                            <svg viewBox="0 0 438.549 438.549" width="24" height="24">
                                <path
                                fill="#1D1D1D"
                                d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                                ></path>
                            </svg>
                            </div>

                            {/*linkedin*/}
                            <div 
                            className='nav-linkedinIcon bg-[#D9D9D9] rounded-full p-2 cursor-pointer'
                            onClick={() => window.open('https://www.linkedin.com/in/harsha-a-k-a8775631b/', '_blank')}
                            onMouseEnter={handleIconHover}
                            onMouseLeave={handleIconLeave}

                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                <rect x="2" y="9" width="4" height="12"/>
                                <circle cx="4" cy="4" r="2"/>
                            </svg>
                            </div>

                        </div>
                    </div>

                    {/* Close Button */}
                    <div 
                        className="nav-closeButton absolute top-6 right-6 w-[60px] h-[60px] bg-[#D9D9D9] rounded-full flex justify-center cursor-pointer"
                        onMouseEnter={handleCloseHover}
                        onMouseLeave={handleCloseLeave}
                        onClick={() => {
                            handleCloseSidebar(),
                            scrollHandling()
                        }}
                    >
                        <span className="text-[#1D1D1D] text-5xl font-[100]">&times;</span>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Navbar