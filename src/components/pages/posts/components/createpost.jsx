import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import Layout from '../../../layouts';
import styles from '../../../module/custom.module.css';
import {RiDeleteBinLine} from 'react-icons/ri';
import {IoIosImages} from 'react-icons/io';
import { request } from '../../../utils/fetchApi';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { toast } from 'react-toastify';
import {MdCloudUpload} from 'react-icons/md'

function CreatePost(){

  const navigate = useNavigate()

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
  ]

  const token = useSelector(state => state && state.auth.user.token)
  // console.log(token)

  const [title, settitle] = useState('')
  const [desc, setdesc] = useState('')
  const [img, setImg] = useState('')
  const [previewImg, setpreviewImg] = useState('')
  const [fileName, SetFileName] = useState("No File Selected")
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState('')
  console.log({title, desc, img, category})
  
  const categories = [
    'nature',
    'music',
    'travel',
    'design',
    'programming',
    'fun',
    'fashion'
  ]

  const onChangeFile = (e) => {
    const file = e.target.files[0]
    setImg(file)
    SetFileName(file.name)
    previewFile(file)
    // if(e.target.files){
    //   setImg(URL.createObjectURL(e.target.files[0]))
    // }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setpreviewImg(reader.result)
    }
  }

  const createPost = async (e) => {
    e.preventDefault();
  
    // if(!img) return;
    // const reader = new FileReader()
    // reader.readAsDataURL(img)
    // reader.onloadend = () => {
    //   uploadImage(reader.result)
    // };
    // reader.onerror = () => {
    //   console.log('error')
    // }
    if(img && title && desc && category){
      try{
        const formData = new FormData()
        let filename = null
        
          if(img){
          filename = crypto.randomUUID() + img.name
          formData.append('filename', filename)
          formData.append('image', img)

          await axios({
            method: 'POST',
            url: 'https://uwaksblog.onrender.com/api/posts/upload',
            data: formData
          })
          .then((res) => {console.log(res.data)})
          .catch((err) => {console.log(err)})
        }else{
          return
        }

        const options = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        const body = {
          title,
          desc,
          category,
          photo: filename
        }
        const data = await request('/api/posts/', 'POST', options, body)
        navigate(`/viewpost/${data._id}`)
        console.log(data)
      }
      catch(error){
        console.log(error)
      }
    }else{
      toast.warning('all field must be filled')
    }
  }


  // const uploadImage = async (base64EncodedImage) => {
  //   axios({
  //     url: 'http://localhost:3000/api/posts/upload',
  //     method: 'POST',
  //     data: {
  //       image: base64EncodedImage
  //     }
  //   }).then((res) => console.log(res) )
  //   .catch((err) => console.log(err))
  // }
  
    return(
      <Layout>
        <div className={`max-w-[1240px] mx-auto text-[14px] py-3 px-6 md:flex gap-x-5 ${styles.editcontainer}`}>
          <div className='flex'>
            <form onSubmit={createPost}>
                  {img ? 
                  <div
                   className='relative my-1 w-full h-[150px] overflow-hidden border-dashed rounded-[5px]'>
                    <img src={previewImg} className='w-full h-full absolute bg-center bg-contain' alt={fileName}/>
                    <div className='absolute bg-black p-3 w-full flex justify-between text-white'>
                      {fileName}
                      <span className='cursor-pointer'><RiDeleteBinLine size={20} onClick={() => {
                        SetFileName("No File Selected") 
                        setImg(null)}}/></span>
                    </div>
                  </div>
                  :
                  <div className='flex mb-2 px-3 py-6 md:p-6 gap-[10px] border-[2px] border-[#ec3338] border-dashed bg-[#fff2f3] rounded-[3px]'>
                    <div>
                      <div className='p-3 rounded-full bg-[#ec3338] text-white'>
                        <IoIosImages className='text-[15px] md:text-[25px]'/>
                      </div>
                    </div>
                    <div>
                      <p>Drag & drop or browse your computer <br /> you can add more than one</p>
                      <span className='text-[10px] text-[#b2b2b2]'>Support .jpg .png .gif .mp4 max 100mb</span><br/>
                      <input 
                        id='images'
                        type='file' 
                        onChange={onChangeFile} 
                        accept='All Files (*.*)' 
                        hidden/>
                      <div className='py-1'>
                        <label htmlFor='images' className='rounded-sm text-[12px] py-2 px-3 bg-[#ec3338] text-white cursor-pointer flex items-center justify-center gap-2 w-[150px]'> <MdCloudUpload size={20}/> Upload File</label>
                        
                      </div>
                    </div>
                  </div>
                }
                <input type='text' placeholder='Enter Title' className='p-2 w-full my-2 border-[#b2b2b2] border-[0.5px] outline-none' value={title} onChange={(e) => settitle(e.target.value)}/>
                <ReactQuill className='mb-4 mt-2' modules={modules} formats={formats} value={desc} onChange={(newValue) => setdesc(newValue)}/>
                
                <div className='my-2'>
                  <div className='flex justify-between items-center py-2 px-3 border-[#b2b2b2] border-[.5px] cursor-pointer' 
                  onClick={() => setOpen(prev => !prev)}>
                    {category ? category : 'Select Category'}
                    {open ? <BiChevronUp size={20}/> : <BiChevronDown size={20}/>}
                  </div>
                  <ul className={`bg-[#fff2f3] mt-3 overflow-y-auto no-scrollbar ${open ? 'max-h-28' : 'max-h-0'}`}>
                    {categories?.map((category, index) => {
                      return <li 
                      key={index}
                      className='py-2 px-5 hover:bg-[#ec3338] hover:text-white cursor-pointer'
                      onClick={() => {
                        setCategory(category)
                        setOpen(false)
                      }}
                      onChange={(e) => setCategory(e.target.value)}
                      >
                        {category}
                      </li>
                    })}
                  </ul>
                </div>
                <button className={`p-2  bg-[#1b1b1b] w-full text-[#fff2f3] cursor-pointer ${styles.bold}`}>Submit Data</button>
            </form>
          </div>
          <div className='hidden md:flex'>
            <h1 className={styles.bold}>No Available component yet</h1>
          </div>  
          </div>
        </Layout>
    )
}
export default CreatePost;