import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../authentication/auth.module.css'
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../app/slices/authSlice";
import { toast } from "react-toastify";
import {GrMail} from 'react-icons/gr';
import {AiFillLock} from 'react-icons/ai';
import Loader from "../loader/loader";
import CardBox from "../pages/posts/components/boxcomponent/cardbox";

function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const UserRef = useRef()
    useEffect(() => {
        UserRef.current.focus()
    }, [])

    const[fData, setFData] = useState({
        email: '',
        password: ''
    })
    const [eye, setEye] = useState(false)
    const handleEye = () => {
        setEye(prev => !prev)
    }
    const {email, password} = fData
    const {isError, user, isSuccess, isLoading, message} = useSelector((state) => state.auth)
    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    if(isLoading){
        return <Loader />       
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
    const onSubmit = async (e) => {
        e.preventDefault();
        if(fData.email && fData.password){
            const userData = {
                email,
                password
            }
            dispatch(login(userData))
        }   
    }

    const checkInputs = Boolean(fData.email) && Boolean(fData.password)
    return(
        <div className={styles.auth_container}>
            <div className="max-w-[1240px] p-8 md:p-0 mx-auto h-screen flex items-center justify-center text-[#3d3c3c]">
                <CardBox>
                    <div className="bg-[#1b1b1b] hidden md:flex justify-center items-center md:rounded-tl-[3px] md:rounded-bl-[3px]">
                        <div className={`px-8 py-14 border-[4px] border-white text-center rounded-full ${styles.bold}`}>
                            <h1 className="text-[#ec3338] text-2xl">In-House</h1>
                            <h5 className="text-sm text-white">BLOG</h5>
                        </div>
                    </div>
                    <form className={styles.form_container}>
                        <div className="flex flex-col items-center">
                            <h1 className="text-[#ec3338] text-2xl">Login</h1>
                            <h5 className="text-sm">Existing Users Only.</h5>
                        </div>
                        <div className="flex my-4 items-center bg-[#f9f9f9] rounded-[5px] border-[.5px] border-[#b2b2b2]">
                            <div className="p-2 text-[#ec3338]"><GrMail size={18}/></div>
                            <input type='text' ref={UserRef} placeholder='Email Address' id="email" name='email' value={fData.email} onChange={handleChange}/>
                        </div>
                        <div className="flex items-center bg-[#f9f9f9] rounded-[5px] border-[.5px] border-[#b2b2b2] relative">
                            <div className="p-2 text-[#ec3338]"><AiFillLock size={18}/></div>
                            <input type={eye ? 'text':'password'} placeholder='Password' name='password' value={fData.password} onChange={handleChange}/>
                            <span onClick={handleEye} className='absolute right-3 cursor-pointer bg-[#3d3c3c] text-white py-1 px-3 rounded-[5px] text-[12px]'>{eye ? 'hide': 'show'}</span>
                        </div>
                     
                        <div className={`py-2 text-right ${styles.bold}`}>
                            <Link to='/forgotpassword'>Forgot password?</Link>
                        </div>
                        <button className={`button w-full p-[10px] text-white rounded-[5px] ${styles.bold} ${checkInputs ? 'bg-[#3d3c3c] cursor' : 'bg-[#b2b2b2] cursor-not-allowed'}`} onClick={onSubmit} disabled={!checkInputs}>Login</button>
                        <div className="text-center p-3">
                            <h1>Don't have an account ? <Link to='/register'><span className="text-[#ec3338]">Create Account</span></Link></h1>
                        </div>
                    </form>
                </CardBox>
            </div>  
    </div>
    )
}
export default Login