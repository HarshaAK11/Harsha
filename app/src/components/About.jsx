import React, { useEffect } from 'react'
import cat from '../assets/images/cat.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const About = () => {

  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const aboutText = gsap.utils.toArray(".about-container p");

    aboutText.forEach((text, index) => {
      gsap.fromTo(
        text,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: index * 0.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-container",
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className='bg-[#D9D9D9] w-full h-screen max-xs:h-fit flex justify-center items-center py-10 px-4' id='about'>
      <div className='flex xl:flex-row md:flex-row sm:flex-col-reverse max-xs:flex-col-reverse items-center md:ml-[100px] lg:ml-[200px] max-w-7xl'>

        {/*Illustrations*/}
        <div data-scroll data-scroll-speed='0.1' className='relative pt-[5rem] md:pt-[10rem] mb-[30px] md:mb-[50px] sm:mt-[100px] max-xs:mt-10'>

          <div className='absolute top-0 left-0 bg-[#8B898A] z-[1] w-[10rem] xl:w-[15rem] xl:h-[30rem] lg:h-[25rem] lg:w-[12rem] md:w-[10rem] md:h-[22rem] sm:w-[10rem] sm:h-[20rem] max-xs:w-[7rem] max-xs:h-[16rem]' 
            style={{transform: 'perspective(500px) rotateY(30deg)'}}>
          </div>
          <img src={cat} alt='cat image' className='relative z-[2] w-[250px] xl:w-[500px] lg:w-[400px] sm:w-[300px] xl:mt-0 md:-mt-[0px] sm:mt-[50px] max-xs:mt-[20px]'/>

        </div>


        {/*Text*/}
        <div className='about-container font text-gray-500 w-full md:w-[40%] lg:w-[30%] mt-8 md:mt-0 px-4 md:px-0 max-xs:mt-0'>
          <p className='fast text-black text-2xl md:text-3xl'><b>Built for intelligence.<br />Designed for impact.</b></p>
          <p className='slow'><br />I'm Harsha, an AI Engineer who turns ambitious ideas into intelligent products people can rely on.</p>
          <p className='slow '><br />I build practical AI experiences that combine machine learning, large language models, and modern software engineering. From first concept to production-ready systems, I focus on technology that solves real problems, feels intuitive, and delivers measurable value.<br/><br/>Beyond the screen, I'm an athlete and a chess player. Both sharpen the discipline, curiosity, and strategic thinking I bring to every challenge.</p>
        </div>

       
      </div>
    </div>
  )
}

export default About
