import React, { useState } from 'react'
import {TfiUser} from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../app/slices/authSlice'
import styles from '../../module/custom.module.css'
import {BiLogOut, BiLogIn} from 'react-icons/bi'
import {IoCreateOutline} from 'react-icons/io5'
import {RiCustomerService2Line} from 'react-icons/ri'
import {FaUserEdit} from 'react-icons/fa'

function Navbar(){
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth.user)

    const [showNav, setShowNav] = useState(false)

    const handleNav = () => {
        setShowNav(prev => !prev)
    }
   
    const Logout = () => {
        dispatch(logout())
    }

    return(
       <nav className='border-b-[1px] border-[#frfeef] text-[14px]'>
            <div className='max-w-[1240px] mx-auto'>
                <div className='flex justify-between items-center py-4 px-6'>
                <Link to='/' className={`${styles.bold} flex gap-x-2 py-2 px-4 rounded-[3px] bg-[#1b1b1b]`}>
                    <h1 className="text-[#ec3338]">In-House</h1>
                    <h5 className="text-sm text-white">BLOG</h5>
                </Link>
                <div className='flex items-center relative'>
                    <div className='p-2 text-[#ec3338] rounded-full cursor-pointer bg-[#1b1b1b]' onClick={handleNav}>
                        <TfiUser size={20}/>
                    </div>
                    {showNav && 
                    <div className='p-6 shadow-md top-[53px] w-[250px] absolute bg-[#1b1b1b] rounded-[4px] text-white right-0 z-10'>
                        {user && <div className='py-2'>Welcome <span className={`${styles.bold} text-[#ec3338]`}>{user.username}</span></div>}
                        <ul>
                        {user ? <>
                            <li className='flex items-center gap-2'><FaUserEdit/> Edit Profile</li>
                            <Link to='/createpost'><li className='flex items-center gap-2'><IoCreateOutline/>Create Post</li></Link>
                            <li className='flex items-center gap-2'><RiCustomerService2Line/> Help</li>
                            <li className='cursor-pointer text-[#ec3338] flex items-center gap-2 hover:font-bold' onClick={Logout}> <BiLogOut/> Sign Out</li></> : <><li><BiLogIn/> <Link to='/login'>login</Link></li>
                            </>}
                        </ul>
                    </div>}
                </div>
            </div>
                
            </div>
       </nav>
    )
}
export default Navbar