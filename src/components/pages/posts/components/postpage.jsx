import axios from 'axios';
import { formatISO9075 } from 'date-fns';
import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import { useStateContext } from '../../../contextapi/context';
function PostPage(){
    const {userInfo} = useStateContext()
    const {id} = useParams()
    const [UserData, setUserData] = useState(null)
    const url = `http://localhost:3000/api/posts/${id}`
    
    useEffect(() => {
        axios.get(url)
        .then((res) => {
            console.log(res.data)
            setUserData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [url])

    if(!UserData) return ''
    
    return(
        <div className='max-w-[1240px] mx-auto p-5'>
            <div className='flex justify-center flex-col items-center'>
                <h1 className='text-3xl font-bold'>{UserData.title}</h1>
                <time>{formatISO9075(new Date(UserData.createdAt))}</time>
                <div className='font-bold'>by @{UserData.author.username}</div>
                {userInfo._id === UserData.author._id && (
                    <Link to={`/edit/${UserData._id}`}>
                        <div className='py-2 px-4 my-1 bg-[#3a3333] text-white rounded-[3px]'>Edit post</div>
                    </Link>
                )}
                <div className='p-3'>
                    <img src={`http://localhost:3000/${UserData.cover}`} alt='/' height={300} width={400}/>
                </div>
                <div dangerouslySetInnerHTML={{__html: UserData.content}} className='py-4 px-6'/>
            </div>
        </div>
    )
}
export default PostPage;