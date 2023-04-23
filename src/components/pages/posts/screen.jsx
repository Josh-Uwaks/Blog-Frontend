import { useEffect, useState } from 'react'
import '../../module/post.css'
import axios from 'axios'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Skeleton from './components/boxcomponent/boxskeleton'
import { Link } from 'react-router-dom'
import NewsSkeleton from './components/boxcomponent/newskeleton'

export default function Screen(){
    const Post_Url = 'http://localhost:3000/api/posts/'
    const [postData, setPostData] = useState('')
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loading, setLoading] = useState(true)

    const [filteredPost, setFilteredPost] = useState([])
    const [posts, setPosts] = useState([])

    // const category = [
    //     'programming'
    // ]
    const [activeCategory] = useState('programming')

    useEffect(() => {
        setTimeout(() => {
            axios.get(Post_Url)
            .then((res) => {
                // console.log(res.data)
                setPostData(res.data)
                setPosts(res.data)
                setFilteredPost(res.data)
                setLoading(false)
            })
            .catch((err) => {console.log(err)})
        }, 1000)
    }, [])

    useEffect(() => {
        if(activeCategory === "programming"){
            setFilteredPost((prev) => {
                const filteredata = posts.filter((post) => post.category.toLowerCase() === activeCategory.toLowerCase())
                return filteredata
            })
        }
    }, [activeCategory, posts])

    const slideLength = postData.length
    const autoScroll = true
    let slideInterval;
    let IntervalTime = 10000;

    const onPrevClick = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    }

    const onNextClick = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    }

    function auto(){
        slideInterval = setInterval(onNextClick, IntervalTime)
    }

    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    useEffect(() => {
        if(autoScroll){
            auto()
            return () => clearInterval(slideInterval)
        }
    }, [currentSlide])

    return(
        <section className='max-w-[1240px] mx-auto text-[#1b1b1b]'>
            <div className='post-container px-6 py-6'>
                <div className='slider'>
                    <AiOutlineArrowLeft onClick={onPrevClick} className='left arrow text-white'/>
                    <AiOutlineArrowRight onClick={onNextClick} className='right arrow text-white'/>           
                    {
                    loading ?
                    <Skeleton/>
                    :
                    postData.length > 0 ? postData.map((item,index) => (
                    <div key={item._id} className={index === currentSlide ? 'slide current' : 'slide'}>
                        <div className='img_container'>
                            <img src={`http://localhost:3000/images/${item.photo}`} alt='/'/>
                        </div>
                        <div className='flex flex-col mt-3'>
                            <h1 className='py-1 text-[#ec3338]'>{item.category}</h1>
                            <h1 className='text-xl bold'>{item.title}</h1>
                            <span className='tracking-wider text-[12px]'>{item.userId.username}</span>
                        </div>
                    </div>   
                    ))
                    : 
                    <div className='bg-[#1b1b1b] text-white p-3 rounded-[3px]'>No Data</div>
                }
                </div>                
                <div className=''>
                    {loading ? 
                    <>
                     <NewsSkeleton/>
                     <NewsSkeleton/>
                     <NewsSkeleton/>
                    </>
                    : filteredPost.length > 0 ? filteredPost.map((item, index) => (
                        <div className='sidenews' key={index}>
                            <div className='side_imgcontainer'>
                                <img src={`http://localhost:3000/images/${item?.photo}`} alt='/'/>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-[14px] text-[#ec3338]'>{item.category}</span>
                                <Link to={`/viewpost/${item._id}`} className='leading-6 md:text-lg cursor-pointer bold hover:underline'>{item.title}</Link>
                                <div className='flex gap-x-3'>
                                    <span className='text-[12px] tracking-wider'>{item.userId.username}</span>
                                    <span className='text-[12px] text-[#ec3338] bold'>{item?.likes.length} likes</span>
                                </div>
                            </div>
                        </div>
                    ))
                :

                <div className='bg-[#1b1b1b] text-white p-3 rounded-[3px]'>No Data</div>
                }                    
                </div>
            </div>
        </section>
    )
}