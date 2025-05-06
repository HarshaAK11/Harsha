import React, { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Web Dev",
      items: ["Immersive websites.", "Engaging experiences."],
    },
    {
      id: 2,
      title: "Branding",
      items: ["Unique identities.", "Memorable brands."],
    },
    {
      id: 3,
      title: "Digital Solutions",
      items: ["Tailored strategies.", "Business growth."],
    },
    {
      id: 4,
      title: "UX/UI Design",
      items: ["Intuitive interfaces.", "Seamless interactions."],
    },
  ];

  useEffect(() => {
    const serviceCards = gsap.utils.toArray(".service-card");

    serviceCards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="service-container font bg-black w-full text-[#878787] flex flex-col items-center justify-center pt-[200px] pb-[200px]" id="services">

      <div className="service-title xl:w-[61%] sm:w-[80%] max-xs:w-[80%] leading-none mb-[100px]">
        <h1 className="xl:text-[5rem] md:text-[4rem] sm:text-[3rem] max-xs:text-[2rem] tracking-[-3px] max-xs:tracking-[-1px]">
          <span className="xl:text-[30px] md:text-[25px] sm:text-[15px] max-xs:text-[15px] tracking-[0] absolute translate-y-5 xl:translate-y-10 md:translate-y-5 max-xs:translate-y-2">
            (Services)
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I’m
          the Creator
          <br /> who transforms creative visions into reality, honoring
          originality in every detail.
        </h1>
      </div>

      {/* Services */}
      <div className="xl:text-[5rem] sm:text-[4rem] max-xs:text-[2.2rem] xl:w-[61%] sm:w-[80%] max-xs:w-[80%] leading-[100px] tracking-[-1px] max-xs:leading-[60px]">
        {services.map(({ id, title, items }) => (
          <div className="mb-10 service-card opacity-0" key={id}>
            <h1 className="border-b border-[rgb(255,255,255,0.2)]">
              <span className="text-[orangered]">
                {String(id).padStart(2, "0")}
              </span>
              &nbsp;&nbsp;&nbsp;{title}
            </h1>

            <div className="flex items-center justify-between mt-3">
              {/* Subtitle */}
              <div className="flex gap-2 cursor-default tracking-[0px] font-semibold">
                {items.map((item, index) => (
                  <p
                    key={index}
                    className="text-sm max-xs:text-xs border border-[rgba(255,255,255,0.2)] rounded-full px-6 py-2 max-xs:px-4 max-xs:py-2"
                  >
                    {item}
                  </p>
                ))}
              </div>

              {/* Dot */}
              <div className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.2)] max-xs:hidden"></div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
