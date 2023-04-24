import displayimage from '../../assets/drone.jpg'
import '../../module/post.css'
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi'
import { useEffect, useRef } from 'react'

const pressroom = [
    {
        id: 1,
        display: displayimage,
        headline: 'Africa Prudential to host a webinar on “Thriving with digital'
    },
    {
        id: 2,
        display: displayimage,
        headline: 'Africa Prudential to host a webinar on “Thriving with digital'
    },
    {
        id: 3,
        display: displayimage,
        headline: 'Africa Prudential to host a webinar on “Thriving with digital'
    },
    {
        id: 4,
        display: displayimage,
        headline: 'Africa Prudential to host a webinar on “Thriving with digital'
    },
    {
        id: 5,
        display: displayimage,
        headline: 'Africa Prudential to host a webinar on “Thriving with digital'
    },
    {
        id: 6,
        display: displayimage,
        headline: 'Africa Prudential to host a webinar on “Thriving with digital'
    }
]

export default function PostSlider(){
    const headlineRef = useRef(null)
    let divW = null


    useEffect(() => {
        divW = headlineRef.current.offsetWidth;
    }, [headlineRef])

    const handleScroll = (sign) => {
        const distance = 200
        headlineRef.current.scrollBy({
            left: sign === '-' ? -distance : distance,
            behavior: 'smooth'
        });
        divW = sign === '+' ? divW + distance : divW - distance
        console.log(divW)
    }

    return(
        <section className='bg-[#1b1b1b]'>
        <div className='flex px-6 py-14 headcontainer max-w-[1240px] mx-auto'>
        <div className='p-5 flex items-center'>
            <div className='p-2 bg-[#ec3338] cursor-pointer text-white rounded-full' onClick={() => handleScroll('-')}>
                <BiChevronLeft/>
            </div>
        </div>
        <div className='flex-1'>
            <span className='px-2 text-lg text-[#ec3338]'>Press Room</span>
            <div className='md:w-[1050px] mx-auto md:overflow-x-scroll md:flex-nowrap headline' ref={headlineRef}>
                <div className='flex gap-x-[20px] p-2'> 
                {pressroom.map((item) => (
                    <div key={item.id} className='md:min-w-[250px] bg-white'>
                        <div className='overflow-hidden'>
                            <img src={item.display} className='rounded-[5px] h-[150px] w-full' alt='/'/>
                        </div>   
                        <div>
                            <h2 className='text-[#ec3338]'>Partner</h2>
                            <h1 className='text-lg'>{item.headline}</h1>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <div className='flex items-center p-5'>
            <div className='p-2 bg-[#ec3338] cursor-pointer text-white rounded-full' onClick={() => handleScroll('+')}>
                <BiChevronRight/>
            </div>
        </div>   
    </div>
    </section>
    )
}