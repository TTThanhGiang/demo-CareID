import React from 'react';
import { ChevronRight } from 'lucide-react';


export default function Brands() {

  const brandLogos = [
    { 
      name: "Fatz",
      image: "/images/brands/fatz.png"
    },
    {
      name:"Medela",
      image:"/images/brands/medela.png"
    },
    {
      name:"Beurer",
      image:"/images/brands/beurer.png"
    },
    {
      name:"Spectra",
      image:"/images/brands/spectra.png"
    },
    {
      name:"Panasonic",
      image:"/images/brands/panasonic.png"
    },
    {
      name:"Imani",
      image:"/images/brands/imani.png"
    },
    {
      name:"Momcozy",
      image:"/images/brands/momcozy.png"
    }
  ];


return (

  <div className="
    bg-white
    p-6
    rounded-xl
    shadow-sm
    border
    border-gray-100
    flex
    flex-col
    justify-between
    h-full
    ">


      <div className="
      flex
      justify-between
      items-center
      mb-6
      ">


        <h3 className="
        font-bold
        text-xs
        uppercase
        tracking-wider
        text-gray-400
        ">

        Đối tác thương hiệu

        </h3>



        <a
        href="#"
        className="
        text-xs
        text-gray-400
        hover:text-gray-600
        flex
        items-center
        "
        >

        Xem tất cả

        <ChevronRight size={14}/>

        </a>


      </div>




    <div className="
    grid
    grid-cols-3
    sm:grid-cols-4
    md:grid-cols-7
    gap-5
    items-center
    justify-items-center
    ">


    {
    brandLogos.map((brand)=> (

    <div
    key={brand.name}
    className="
    w-20
    h-12
    flex
    items-center
    justify-center
    rounded-lg
    hover:bg-white
    transition
    "
    >


    <img

    src={brand.image}

    alt={brand.name}

    className="
    max-w-[90px]
    max-h-[90px]
    object-contain
    hover:grayscale-0
    hover:opacity-100
    transition
    "

    />


    </div>

    ))

    }


    </div>



  </div>

  )

}