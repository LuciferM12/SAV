'use client'
import React, { useEffect, useState } from 'react'
import { getHistoryImage } from './actions';



const Historia = () => {
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogo = async () => {
            const logo = await getHistoryImage()
            setImage(logo)
        }
        fetchLogo()
    })

    return (
        <section className='w-full min-h-52 flex p-12 box-border  items-center justify-center xs:p-5'>
            <div className='w-[80%] flex flex-wrap xs:w-[100%] gap-12'>
                <div className='w-[48%] p-2 flex flex-col items-center 2xl:w-full'>
                    <h1 className='font-extrabold text-3xl mb-3'>Nosotros</h1>
                    <p className='leading-normal font-light '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore consequuntur voluptas fugit, repudiandae cumque pariatur error fuga sunt excepturi cupiditate ullam, inventore similique quasi laudantium, aspernatur officiis quae sequi? Eligendi accusamus maiores ullam ab pariatur quas obcaecati reprehenderit. Necessitatibus sequi incidunt, dolor ipsam aliquid quod placeat? Perspiciatis quaerat fugit laudantium expedita. Illum enim optio neque ipsam exercitationem voluptate architecto! Id ratione earum iste provident aliquam hic assumenda, repellendus ipsum et sint laboriosam impedit autem illo architecto porro atque labore perspiciatis rem fugit animi minus! Ipsam incidunt nam laborum beatae veritatis sed tempore laudantium deserunt sit magni, dignissimos sint magnam nihil?</p>
                </div>
                <div className='w-[48%] p-2 flex flex-col items-center 2xl:w-full'>
                {image && <img className='w-[70%] rounded-xl xs:w-[100%]'  src={image} alt="Logo" />}
                </div>
            </div>
        </section>
    )
}

export default Historia