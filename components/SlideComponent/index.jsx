import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Articles from '../articles';
import style from './style.module.scss'
import Image from 'next/image';
import NextImage from '../image';
import test from '../../public/images/autismo.png'

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(next)
      })
    })
  }
}

export default function SliderComponent({articles}) {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )


  console.log(articles)
  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        
        
      {articles.map((ele,i) => {
          return (
            <div key={ele.id} className={`keen-slider__slide number-slide${i+1}`}>
            <div className={style.sliderProps}>
              
               <img src={`http://localhost:1337${ele.attributes.image.data.attributes.url}`}  alt="" />
                <h1>{ele.attributes.title}</h1>
               <h3>{ele.attributes.description}</h3>
              </div>
            </div>
          )
        })}
        
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
         
        
         {articles.map((ele,i) => {
          return (
            <div key={ele.id} className={`keen-slider__slide number-slide${i+1} ${style.widthSlider}`}>
                  <img src={`http://localhost:1337${ele.attributes.image.data.attributes.url}`}  alt="" />
                <h2>{ele.attributes.title}</h2>
               <h3>{ele.attributes.description}</h3>
                              </div>
          )
        })}
       
      </div>
      
     
    </>
  )
}
