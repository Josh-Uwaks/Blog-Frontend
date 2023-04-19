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
  const [img, setImg] = useState(null)
  const [fileName, SetFileName] = useState("No File Selected")

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
    setImg(e.target.files[0])
    SetFileName(e.target.files[0].name)
    // if(e.target.files){
    //   setImg(URL.createObjectURL(e.target.files[0]))
    // }
  }

  // const handleCloseImg = () => {
  //   setImg(null)
  // }
  const createPost = async (e) => {
    e.preventDefault();

    try{
      const formData = new FormData()
      let filename = null

      if(img){
        filename = crypto.randomUUID() + img.name
        formData.append('filename', filename)
        formData.append('image', img)

        await axios({
          method: 'POST',
          url: 'http://localhost:3000/api/posts/upload',
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
  }
    return(
      <Layout>
        <div className={`max-w-[1240px] mx-auto text-[14px] py-3 px-6 md:flex ${styles.createpost}`}>
          <div className='flex'>
            <form onSubmit={createPost} className='md:w-[500px]'>
                {/* <label>Add Image</label> */}
                  {img ? 
                  <div
                   className='relative my-1 w-full h-[150px] overflow-hidden border-dashed rounded-[5px]'>
                    <img src={img} className='w-full h-full absolute bg-center bg-contain' alt={fileName}/>
                    <div className='absolute bg-black p-3 w-full flex justify-between text-white'>
                      {fileName}
                      <span className='cursor-pointer'><RiDeleteBinLine size={20} onClick={() => {
                        SetFileName("No File Selected") 
                        setImg(null)}}/></span>
                    </div>
                  </div>
                  :
                  <div className='flex my-1 p-6 gap-[10px] border-[2px] border-[#ec3338] border-dashed bg-[#fff2f3] rounded-[3px]'>
                    <div>
                      <div className='p-3 rounded-full bg-[#ec3338] text-white'>
                        <IoIosImages size={25}/>
                      </div>
                    </div>
                    <div>
                      <p>Drag & drop or browse your computer <br /> you can add more than one</p>
                      <span className='text-[10px] text-[#b2b2b2]'>Support .jpg .png .gif .mp4 max 100mb</span>
                      <input 
                      id='images'
                        type='file' 
                        onChange={onChangeFile} 
                        accept='All Files (*.*)' 
                         className='my-2'/>
                    </div>
                  </div>
                }
                <input type='text' placeholder='Enter Title' className='p-2 w-full my-2 border-[#b2b2b2] border-[0.5px] rounded-[3px]' value={title} onChange={(e) => settitle(e.target.value)}/>
                {/* <input type='text' placeholder='enter description' value={desc} onChange={(e) => setdesc(e.target.value)}/> */}
                <ReactQuill className='rounded-[3px]' modules={modules} formats={formats} value={desc} onChange={(newValue) => setdesc(newValue)}/>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value=''>Select Option</option>
                  {categories.map((item, index) => {
                    return <option value={item}>{item}</option>
                  })}
                </select>
                <button className='p-3'>Submit</button>
            </form>
          </div>
          <div>Other Components</div>  
          </div>
        </Layout>
    )
}
export default CreatePost;