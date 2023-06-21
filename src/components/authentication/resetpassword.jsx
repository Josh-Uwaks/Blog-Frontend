import React, { useEffect, useState } from 'react'
import { AiOutlineLock } from 'react-icons/ai'
import styles from './auth.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import CardBox from '../pages/posts/components/boxcomponent/cardbox'

function ResetPassword(){
   const {id, token} = useParams()
   const navigate = useNavigate()

   const url = `http://localhost:3000/users/forgotpassword/${id}/${token}`
   const [password, setPassword] = useState("")
   const [confirmPassword, setconfirmPassword] = useState("")
   const [message, setMessage] = useState(false)

   const changePassword = (e) => {
    e.preventDefault()

    if(password !== confirmPassword){
        toast.warning('please check if both passwords are correct', {
            position: "top-center"
        })
    }
    else if(password.length < 6){
        toast.error("password must be 6 char!", {
            position: "top-center"
        });
    }
    else{
        axios({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                password: password
            }
        })
        .then((response) => {
            console.log(response)
            setMessage(true)
            setPassword("")
            setconfirmPassword("")
            setTimeout(() => {
                navigate('/login')
            }, 4000)
        })
        .catch((error) => {
            toast.error("Token Expired generate new" , {
                position: "top-center"
            })
            console.log(error)
        })
    }
   }

   useEffect(() => {
    axios({
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        console.log(response)
        console.log('valid user')
    })
    .catch((error) => {
       navigate("/forgotpassword")
        console.log('invalid user')
    })
   })
    return(
        <div className={styles.auth_container}>
        <div className='max-w-[1240px] p-10 md:p-0 mx-auto h-screen flex justify-center items-center text-[#3d3c3c]'>
        <CardBox>
            <div className="bg-[#1b1b1b] hidden md:flex justify-center items-center">
                <div className={`px-8 py-14 border-[4px] border-white text-center rounded-full ${styles.bold}`}>
                    <h1 className="text-[#ec3338] text-2xl">In-House</h1>
                    <h5 className="text-sm text-white">BLOG</h5>
                </div>
            </div>
            <div className={styles.form_container}>
                <div className="flex flex-col items-center">
                    <h2 className="font-bold p-2 text-2xl">Reset Password</h2>
                    {message && <p className='text-green-800 font-bold'>Password Changed Successfully</p>}
                </div>
                <div className='p-3 text-center bg-[#B1D0B9] text-green-800 rounded-[5px]'>
                    <p>Please Create a new password that you don't use on any other site.</p>
                </div>
                <div className="flex items-center bg-white rounded-[5px] border-[.5px] border-[#b2b2b2] mt-5">
                    <div className="p-2 text-[#ec3338]"><AiOutlineLock  size={18}/></div>
                    <input type='password' placeholder='New Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>              
                <div className="flex items-center bg-white rounded-[5px] border-[.5px] border-[#b2b2b2] mt-5">
                    <div className="p-2 text-[#ec3338]"><AiOutlineLock  size={18}/></div>
                    <input type='password' placeholder='Confirm New Password' name='password' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}/>
                </div>
            
                <button className={`mt-[20px] button w-full p-[10px] ${styles.bold} text-white rounded-[5px] bg-[#3d3c3c]`} onClick={changePassword}>Change</button>
            </div>
        </CardBox>
        </div>
    </div>
    )
}
export default ResetPassword