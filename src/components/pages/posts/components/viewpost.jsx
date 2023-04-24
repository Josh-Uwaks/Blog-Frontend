import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../../../layouts'
import { TfiUser } from 'react-icons/tfi'
import {FiEdit} from 'react-icons/fi'
import {RiDeleteBin3Line} from 'react-icons/ri'
import styles from '../../../module/custom.module.css'
import {AiOutlineLike, AiFillLike} from 'react-icons/ai'
import {formatISO9075} from 'date-fns'
import { request } from '../../../utils/fetchApi'
import { useSelector } from 'react-redux'
import Skeleton from './boxcomponent/boxskeleton'
// import { useNavigate } from 'react-router-dom'
import DeleteModal from './deletemodal/delete'


function Viewpost(){
    // const navigate = useNavigate()
    const {id} = useParams()
    const url = `https://uwaksblog.onrender.com/api/posts/${id}`
    const {user, token} = useSelector((state) => state.auth.user)
    
    const [postData, setPostData] = useState('')   
    const [loading, setLoading] = useState(true) 
    const [isliked, setisLiked] = useState(false)
    const [modal, setModal] = useState(false)

    const handleModal = () => {
        setModal(prev => !prev)
    }
    
    
    useEffect(() => {
        setTimeout(() => {
            axios.get(url, {headers: {
                'Authorization': `Bearer ${token}`
            }})

        .then((res) => {
            console.log(res.data)
            setPostData(res.data)
            setisLiked(res.data.likes.includes(user._id))
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
        }, 1000)

        
    }, [url, token])

    const handleLikedpost = async() => {
        try {
            const options = {
                'Authorization': `Bearer ${token}`
            }
            await request(`/api/posts/likeblog/${id}`, 'PUT', options)
            setisLiked(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>    
          {modal && <DeleteModal id={id} token={token} closeModal={handleModal}/>}  
        <Layout>
            <div className={`p-6 max-w-[1240px] mx-auto  text-[14px] ${styles.editcontainer}`}>
               {loading ?
               <div>
                <Skeleton/>
               </div>
               :
               <div>
                    <div>
                        <img src={`https://uwaksblog.onrender.com/images/${postData?.photo}`} alt='/' className='h-[300px] rounded-[5px] w-full bg-contain bg-[#1b1b1b]'/>
                        <div className='flex justify-between'>
                            <div className='flex py-2 items-center gap-x-[5px]'>
                            <span className='p-2 text-[#ec3338] rounded-full cursor-pointer bg-[#1b1b1b]'>
                                <TfiUser size={20}/>
                            </span>
                                <div>
                                    <h1 className={styles.bold}>{postData.userId.username}</h1>
                                    <time>{formatISO9075(new Date(postData.createdAt))}</time>
                                </div>
                            </div>

                            <div className='flex items-center gap-x-[13px]'>  
                            {user._id === postData.userId._id &&
                                <>
                                <div className='flex gap-x-[5px]'>
                                    <button><Link to={`/editpost/${id}`}><FiEdit size={20}/></Link></button>
                                    <button onClick={handleModal}><RiDeleteBin3Line size={20} className='text-[#ec3338] hover:text-red-800'/></button>
                                </div>
                                </>
                                }

                                {
                                isliked ?
                                <>
                                <div onClick={handleLikedpost} className='cursor-pointer'>
                                    <AiFillLike size={20}/>
                                </div>
                                </>
                                :
                                <>
                                <div onClick={handleLikedpost} className='cursor-pointer'>
                                    <AiOutlineLike size={20}/>
                                </div>
                                </>
                            }
                            </div>
                        </div>
                </div>
               <div>
                   <h1 className={`text-lg md:text-2xl capitalize ${styles.bold}`}>{postData.title}</h1>
                   <p className='text-justify my-2' dangerouslySetInnerHTML={{__html: postData.desc }} />
               </div>
            </div>

            
               }
                <div>
                    <h1 className={styles.bold}>No Component Available yet</h1>
                </div>  
            </div>
        </Layout>

        </>
     
    )
}
export default Viewpost;