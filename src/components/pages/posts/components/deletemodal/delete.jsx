import { GrClose } from 'react-icons/gr'
import styles from '../../../../module/custom.module.css'
import { request } from '../../../../utils/fetchApi'
import { useNavigate } from 'react-router-dom'

const DeleteModal = ({id, token, closeModal}) => {

    const navigate = useNavigate()

    const handleDelete = async() => {
        try {
            const options = {'Authorization': `Bearer ${token}`}
            await request(`/api/posts/delete/${id}`, 'DELETE', options)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className=" bg-black/40 backdrop-blur-md fixed z-10 h-[100vh] w-[100vw] flex justify-center items-center text-[14px]">
            <div className="bg-white w-[250px] md:w-[450px] rounded-[5px]">
                <div className="flex justify-between items-center p-4 border-b-[1px] border-[#d6d6d6]">
                    <h1 className={`md:text-xl ${styles.bold}`}>Delete Confirmation</h1>
                    <span onClick={closeModal}><GrClose className='text-[#727272] cursor-pointer'/></span>
                </div>
                <div className='p-4 text-white'>
                    <p className='bg-[#1b1b1b] p-2 rounded-[5px]'>Are you sure you want to delete this post ?</p>
                </div>
                <div className='flex gap-x-3 justify-end p-2 border-t-[1px] border-[#d6d6d6]'>
                    <button className='py-2 px-3 bg-[#b2b2b2] rounded-[5px] text-[#353333] hover:bg-[#201f1f] hover:text-white' onClick={closeModal}>Cancel</button>
                    <button className='py-2 px-3 bg-[#ec3338] rounded-[5px] text-white hover:bg-red-800' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal