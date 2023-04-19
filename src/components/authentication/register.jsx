import React, {useEffect, useState, useRef} from 'react'
import styles from './auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../app/slices/authSlice'
import { toast } from 'react-toastify'
import {GrMail} from 'react-icons/gr'
import { AiFillLock } from 'react-icons/ai'
import {FaUserCheck} from 'react-icons/fa'
import Loader from '../loader/loader'
import CardBox from '../pages/posts/components/boxcomponent/cardbox'

function Register(){
    // const inputRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const UserRef = useRef()
    useEffect(() => {
        UserRef.current.focus()
    },[])
    const [fData, setFData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [eye, setEye] = useState(false);
    const handleEye = () => {
        setEye(prev => !prev)
    }

    const {username, email, password} = fData
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            toast.success('registered successfully')
        }

        dispatch(reset())
    }, [user,isError, isSuccess, message, dispatch, navigate])

        if(isLoading) {
            
            return <Loader/>
        }
        
    const handleChange = (e) => {
        const {name, value} = e.target
        setFData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    } 
    const checkInput = Boolean(fData.username) && Boolean(fData.email) && Boolean(fData.password)

    const onSubmit = async (e) => {
        e.preventDefault();
        if(checkInput){
            // if(fData.email.includes('@kadickintegrated.com')){
                const userData = {
                    username,
                    email,
                    password
                }
                dispatch(register(userData))
            // }else{
            //     return toast.warn('you cant use unofficial mail')
            // }
            
        }else{
            toast('enter details')
        }
    }
    return(
        <>
        <div className={styles.auth_container}>
            <div className="max-w-[1240px] p-8 md:p-0 mx-auto h-screen flex items-center justify-center text-[#3d3c3c]">
                <CardBox>
                <div className="bg-[#1b1b1b] hidden md:flex justify-center items-center">
                        <div className={`px-8 py-14 border-[4px] border-white text-center rounded-full ${styles.bold}`}>
                            <h1 className="text-[#ec3338] text-2xl">In-House</h1>
                            <h5 className="text-sm text-white">BLOG</h5>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className={styles.form_container}>
                    <div className="flex flex-col items-center">
                            <h1 className="text-[#ec3338] text-2xl">Register</h1>
                            <h5>New Users Only.</h5>
                        </div>
                   
                        <div className='flex items-center mt-4 bg-[#f9f9f9] rounded-[5px] border-[.5px] border-[#b2b2b2]'>
                            <div className='p-2 text-[#ec3338]'><FaUserCheck size={18}/></div>
                            <input type='text' placeholder='Username' id='username' name='username' ref={UserRef} value={fData.username} onChange={handleChange}/>
                        </div>
                          
                        <div className="flex items-center my-4 bg-[#f9f9f9] rounded-[5px] border-[.5px] border-[#b2b2b2]">
                            <div className="p-2 text-[#ec3338]"><GrMail size={18}/></div>
                            <input type='text' placeholder='Email Address' id="email" name='email' value={fData.email} onChange={handleChange}/>
                        </div>               
                       
                        <div className="flex items-center bg-[#f9f9f9] rounded-[5px] border-[.5px] border-[#b2b2b2] relative">
                            <div className="p-2 text-[#ec3338]"><AiFillLock size={18}/></div>
                            <input type={eye ? 'text':'password'} placeholder='Password' name='password' value={fData.password} onChange={handleChange}/>
                            <span onClick={handleEye} className='absolute right-3 cursor-pointer bg-[#3d3c3c] text-white py-1 px-3 rounded-[5px] text-[12px]'>{eye ? 'hide': 'show'}</span>
                        </div>

                        <button className={`mt-[20px] button w-full p-[10px] text-white rounded-[5px] ${styles.bold} ${checkInput ? 'bg-[#3d3c3c] cursor-pointer' : 'bg-[#b2b2b2] cursor-not-allowed'}`} disabled={!checkInput}>Register</button>
                    
                        <div className="text-center p-3">
                            <h1>Don't have an account ? <Link to='/login'><span className="text-[#ec3338]">Sign In</span></Link></h1>
                        </div>
                    </form>
                </CardBox>    
            </div>
        </div>
        </>
    )
}
export default Register