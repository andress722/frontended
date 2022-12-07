import React from "react"
import { useKeenSlider } from "keen-slider/react"
import style from './styles.module.scss'


export default function News({articles}){

   
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
    },
  })
      return (
    <div ref={sliderRef} className={`keen-slider ${style.border}`}>
      
      {articles.map((ele,i) => {
          return (
            
            <div key={ele.id} className={`keen-slider__slide number-slide${i+1}`}>
            <div className={style.sliderProps}>
              <a href="">
               <img src={`http://localhost:1337${ele.attributes.image.data.attributes.url}`}  alt="" />
                <h1>{ele.attributes.title}</h1>
                <div className={style.border}></div>
               <h3>{ele.attributes.description}</h3>
</a>
              </div>
            </div>
           
          )
        })}
        
    </div>
  )

}