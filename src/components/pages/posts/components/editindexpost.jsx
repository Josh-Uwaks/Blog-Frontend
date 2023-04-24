import React, { useEffect, useState } from 'react'
import Layout from '../../../layouts'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { IoIosImages } from 'react-icons/io'
import { RiDeleteBinLine } from 'react-icons/ri'
import ReactQuill from 'react-quill'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import styles from '../../../module/custom.module.css';
import { MdCloudUpload } from 'react-icons/md'

function EditIndexPost(){
    
    const {id} = useParams()
    const url = `https://uwaksblog.onrender.com/api/posts/${id}`
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [img, setImg] = useState('')
    const [previewImg, setpreviewImg] = useState('')
    const [fileName, SetFileName] = useState("No File Selected")
    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState('')
    
    const categories = [
        'nature',
        'music',
        'travel',
        'design',
        'programming',
        'fun',
        'fashion'
      ]

    useEffect(() => {
        setTimeout(() => {
            axios.get(url)
            .then((response) => {
                setImg(response.data.photo)
                settitle(response.data.title)
                setdesc(response.data.desc)
                setCategory(response.data.category)
            })
            .catch((err) => console.log(err))
        }, 1000)
    }, [url])

    const onChangeFile = (e) => {
        const file = e.target.file[0]
        setImg(file)
        SetFileName(file.name)
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setpreviewImg(reader.result)
        }
    }
    // const updatePost = (e) => {
    //     e.preventDefault();
    //     const body = new FormData()
    //     body.set('title', title)
    //     body.set('summary', summary)
    //     if(files?.[0]){
    //         body.set('files', files?.[0])
    //     }
    //     body.set('content', content)
    //     axios({
    //         method: 'put',
    //         url: 'http://localhost:3000/api/posts/',
    //         data: body,
    //         withCredentials: true
    //     })
    //     .then((res) => {
    //         console.log(res.data)
    //         navigate('/')
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
    
    return(
        <Layout>
          <div className={`max-w-[1240px] mx-auto text-[14px] py-3 px-6 md:flex gap-x-5 ${styles.editcontainer}`}>
          <div className='flex'>
            <form>
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

export default EditIndexPost