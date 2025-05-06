import React, { useLayoutEffect, useRef, useState } from 'react';
import ParticlesBackground from './ui/ParticlesBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InteractiveHoverButton } from './ui/interactive-hover-button';
import flower from '../assets/images/flower.jpg';
import toast from 'react-hot-toast'

const Footer = () => {
  gsap.registerPlugin(ScrollTrigger)

  const footerRef = useRef(null)
  const h1Ref = useRef(null)
  const buttonRef = useRef(null)
  const pRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: '', description: '' })

  const modalRefRight = useRef(null)
  const modalRefLeft = useRef(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Create a timeline ref to control animations
  const modalTimeline = useRef(null);

  useLayoutEffect(() => {
    // GSAP context for cleanup
    let ctx = gsap.context(() => {

      // Animate <h1>
      gsap.fromTo(h1Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reset', 
          }
        }
      );
  
      // Animate <button>
      gsap.fromTo(buttonRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reset',
          }
        }
      );
  
      // Animate <p>
      gsap.fromTo(pRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.9,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reset', 
          }
        }
      );
    }, footerRef);

    // Create an empty timeline
    modalTimeline.current = gsap.timeline({ paused: true });

    return () => {
      ctx.revert();
      modalTimeline.current.kill();
    }
  }, []);

  // Handle modal open
  const handleModalOpen = () => {
    setShowModal(true);
    modalTimeline.current
      .clear()
      .fromTo([modalRefLeft.current, modalRefRight.current], 
        { 
          y: (index) => index === 0 ? -500 : 500
        }, 
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0
        }
      )

      .fromTo(['.modalheading', '.modalInput1', '.modalInput2', '.modalTextarea', '.modalButton', '.modalp', '.instagramIcon', '.githubIcon', '.linkedinIcon', '.mail'], {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power1.out", 
        stagger: 0.1
      },'0.5' )

      .fromTo('.modal-closeButton', {
        opacity: 0,
        scale: 0.5
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power1.out", 
        stagger: 0.1
      },'<' )

      .play();
  };

  // Handle modal close
  const handleModalClose = () => {
    modalTimeline.current
      .clear()

      .to(['.modalheading', '.modalInput1', '.modalInput2', '.modalTextarea', '.modalButton', '.modalp', '.instagramIcon', '.githubIcon', '.linkedinIcon', '.mail'], {
        opacity: 0,
        y: -50,
        duration: 0.3,
        ease: "power1.out", 
        stagger: 0.1
      })

      .to('.modal-closeButton', {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power1.out", 
        stagger: 0.1
      },'<' )

      .to([modalRefLeft.current, modalRefRight.current], {
        y: (index) => index === 0 ? -500 : 500,
        duration: 0.5,
        ease: 'power1.out',
        onComplete: () => setShowModal(false)
      }, '0.5')
   

      .play();
  };

  const scrollHandling = () => {
      setIsMenuOpen(!isMenuOpen)
      isMenuOpen ? window.LocomotiveScroll.start() : window.LocomotiveScroll.stop()
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    try {
      const response = await fetch('http://localhost:3000/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          question: formData.get('question')
        })
      })

      const data = await response.json()

      if(response.ok) {
        e.target.reset()
        toast.success('Message sent successfully!')
        console.log('there you go')
      } else {
        toast.error('error')
        console.log('here we land')
      }
      
    } catch (error) {
      console.error('Error sending message:', error.message)
      setToastMessage({ title: 'An error occurred while sending the message.', description: 'Please try again later.' })
    }
  }


  return (
    <>
      <footer className='font w-full h-screen text-[#D9D9D9] relative' id='footer' ref={footerRef}>

        
        {/* Particles Background */}
        <div className='absolute left-0 top-0 w-full h-screen z-[-1]'>
          <ParticlesBackground />
        </div>

        {/* Footer Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center gap-10 translate-y-[-50px]">

          {/* Main Heading */}
          <h1 ref={h1Ref} className="xl:text-9xl md:text-8xl sm:text-7xl max-xs:text-5xl text-center font-[700]">
            Ready to elevate<br/>your brand?
          </h1>

          {/* Contact button */}
          <InteractiveHoverButton 
            ref={buttonRef} 
            onClick={() => {
                handleModalOpen(),
                scrollHandling()
              }}
            className="bg-[#D9D9D9] text-[black] hover:text-[#D9D9D9]"
          >
            Get in Touch
          </InteractiveHoverButton>

          {/* Copyright */}
          <p ref={pRef} className="absolute bottom-0">
            ©Harsha 2025 | All rights reserved
          </p>

        </div>  

        {/* Message Modal */}
        <div 
          className={`font fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[97vw] h-[93vh] flex xl:flex-row lg:flex-row sm:flex-col max-xs:flex-col justify-between items-center z-50 overflow-hidden ${
            showModal ? 'visible' : 'invisible'
          }`}
        >

          {/* Left Side */}
          <div ref={modalRefLeft} className='w-[50%] sm:w-[93%] max-xs:w-[93%] xl:h-full lg:h-full md:h-[80vh] sm:h-[80vh] max-xs:h-[80vh] bg-[#D9D9D9] text-[black] flex flex-col justify-center items-center'>

            {/* Heading */}
            <div className='modalheading xl:text-8xl sm:text-6xl max-xs:text-5xl flex flex-col items-center'>
              <h1 className='font-[900] text-center xl:tracking-[-3px] sm:tracking-[-2px]'>GET IN</h1>
              <h1 className='cursive-font font-[900] tracking-[-3px] text-center w-[40%] mt-[-10px]'>Touch</h1>
            </div>

            {/* Form */}
            <form className='flex flex-col gap-8 max-xs:gap-4 max-xs:mt-4 max-xs:w-[300px]' onSubmit={handleSubmit}>

              <div className='flex max-xs:flex-col gap-8 max-xs:gap-4'>
                <input type="text" name='name' placeholder="Your Name" className=' modalInput1 border-[grey] text-[grey] bg-[transparent] border-2  p-3 outline-none placeholder:text-[grey] max-xs:w-[100%]'  required/>
                <input type="email" name='email' placeholder="Your Email" className=' modalInput2 border-[grey] text-[grey] bg-[transparent] border-2  p-3 outline-none placeholder:text-[grey]'  required/>
              </div>   

              <textarea name='question' placeholder="What can i help you with?" className='modalTextarea h-[180px] border-[grey] text-[grey] bg-[transparent] border-2  p-3 outline-none placeholder:text-[grey] resize-none' required/>

              <button type="submit" className='modalButton w-[200px] bg-[#D9D9D9] text-[black] hover:text-[#D9D9D9] hover:bg-[black] border-2 rounded-3xl border-[black] p-3 transition duration-300 max-xs:mt-4'>SUBMIT MESSAGE</button>


            </form>

            {/* Close Button for small screens*/}
            <div 
              className="modal-closeButton absolute top-[30px] right-[30px] w-[50px] h-[50px] bg-[grey] rounded-full justify-center items-center cursor-pointer xl:hidden lg:hidden md:flex sm:flex max-xs:flex"
              onMouseEnter={handleCloseHover}
              onMouseLeave={handleCloseLeave}
              onClick={() => {
                handleModalClose(),
                scrollHandling()
              }}

            >
              <span className="text-[#D9D9D9] text-5xl font-[100]">&times;</span>
            </div>

          </div>

          {/* Right Side */}
          <div ref={modalRefRight} 
          className='
          w-[50%] sm:w-[93%] max-xs:w-[93%] 
          xl:h-full lg:h-full md:h-[20vh] sm:h-[20vh] 
          p-8 
          flex flex-col justify-between 
          xl:items-end lg:items-end md:items-start 
          bg-[#858587] bg-no-repeat xl:bg-cover 
          xl:bg-center lg:bg-center md:bg-right sm:bg-right max-xs:bg-right
          xl:bg-cover lg:bg-cover sm:bg-[length:400px_400px] max-xs:bg-[length:150px_150px]
          ' 
          style={{ backgroundImage: `url(${flower})` }}> 


            {/* Close Button */}
            <div 
              className="modal-closeButton w-[50px] h-[50px] bg-[#D9D9D9] rounded-full justify-center items-center cursor-pointer xl:flex lg:flex md:hidden sm:hidden max-xs:hidden"
              onMouseEnter={handleCloseHover}
              onMouseLeave={handleCloseLeave}
              onClick={() => {
                handleModalClose(),
                scrollHandling()
              }}

            >
              <span className="text-[grey] text-5xl font-[100]">&times;</span>
            </div>

            {/*contact*/}
            <div className='flex flex-col xl:items-end lg:items-end md:items-start gap-5'>

              {/* Icons */}
              <div className='flex gap-5'>

                {/*instagram*/}
                <div 
                  className='instagramIcon bg-[#D9D9D9] rounded-full p-2 cursor-pointer'
                  onClick={() => window.open('https://www.instagram.com/harsh__ine/', '_blank')}
                  onMouseEnter={handleIconHover}
                  onMouseLeave={handleIconLeave}

                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="grey" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                

                {/*github*/}
                <div 
                  className='githubIcon bg-[#D9D9D9] rounded-full p-2 cursor-pointer'
                  onClick={() => window.open('https://github.com/HarshaAK11', '_blank')}

                  onMouseEnter={handleIconHover}
                  onMouseLeave={handleIconLeave}
                >
                  <svg viewBox="0 0 438.549 438.549" width="24" height="24">
                    <path
                      fill="grey"
                      d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                    ></path>
                  </svg>
                </div>
                
                {/*linkedin*/}
                <div 
                  className='linkedinIcon bg-[#D9D9D9] rounded-full p-2 cursor-pointer'
                  onClick={() => window.open('https://www.linkedin.com/in/harsha-a-k-a8775631b/', '_blank')}
                  onMouseEnter={handleIconHover}
                  onMouseLeave={handleIconLeave}

                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="grey" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>

              </div>

              {/* mail */}
              <div className='mail xl:text-end md:text-start text-sm'>
                <p>You can also contact me at</p>
                <a 
                  href="mailto:harshaadithyakumar@gmail.com" 
                  className='relative inline-block after:content-[""] after:absolute after:w-full after:h-[1px] after:bg-[#D9D9D9] after:left-0 after:bottom-0 hover:after:w-0 hover:after:left-auto hover:after:right-0 after:transition-all after:duration-300'
                >
                  harshaadithyakumar@gmail.com
                </a>
              </div>

              

            </div>

          </div>

        </div> 

      </footer>
    </>

  );
};

export default Footer;  
