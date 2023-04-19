import axios from 'axios';
import React,{useState} from'react'
import { GrMail } from 'react-icons/gr';
import { toast } from 'react-toastify';
import styles from './auth.module.css';
import {CiWarning} from 'react-icons/ci'
import CardBox from '../pages/posts/components/boxcomponent/cardbox';

function ForgotPassword(){
    const [email, setEmail] = useState('')
    console.log(email)
    const checkUrl = 'https://uwaksblog.onrender.com/api/users/resetpassword'

    const sendEmail = (e) => {
        e.preventDefault();

        if(email === ''){
            toast.error('Invalid Inputs')
        }
        else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            })}
        else{
            axios({
                method: 'POST',
                url: checkUrl,
                data: {
                    email: email
                }
            }).then((res) => {
                console.log(res)
                toast.success(res.data.message)
                setEmail("")
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data)
                setEmail("")
            })
        }
    }

    const checkInput = Boolean(email)
    return(
        <div className={styles.auth_container}>
            <div className='max-w-[1240px] mx-auto h-screen flex justify-center items-center text-[#3d3c3c]'>
            {/* <div className={`${styles.layout}`}> */}
            <CardBox>
                <div className="bg-[#1b1b1b] hidden md:flex justify-center items-center">
                    <div className={`px-8 py-14 border-[4px] border-white text-center rounded-full ${styles.bold}`}>
                        <h1 className="text-[#ec3338] text-2xl">In-House</h1>
                        <h5 className="text-sm text-white">BLOG</h5>
                    </div>
                </div>
                <div className={styles.form_container}>
                    <div className="flex flex-col items-center">
                        <span><CiWarning size={60}/></span>
                        <h2 className="font-bold p-2 text-2xl">Forgot Your Password ?</h2>
                        <h3>Please enter your email address below</h3>
                    </div>
                    
                    <div className="flex items-center mt-6 bg-white rounded-[5px] border-[.5px] border-[#b2b2b2]">
                        <div className="p-2 text-[#ec3338]"><GrMail size={18}/></div>
                        <input type='text' placeholder='Enter Your Email Address' id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
            
                    <button className={`mt-6 button w-full p-[10px] text-white rounded-[5px] ${styles.bold} ${checkInput ? 'bg-[#3d3c3c] cursor-pointer' : 'bg-[#b2b2b2] cursor-not-allowed'}`} onClick={sendEmail} disabled={!checkInput}>Send</button>
                </div>
            </CardBox>
            {/* </div> */}
            </div>
        </div>
    )
}

export default ForgotPassword;