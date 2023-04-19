import React, { useEffect, useState } from 'react'
import Layout from '../../../layouts'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function EditIndexPost(){
    
    const {id} = useParams()
    const url = `http://localhost:3000/api/posts/${id}`
    const [userData, setUserData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            axios.get(url)
            .then((response) => {
                setUserData(response.data)
                console.log(response.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
        }, 5000)
    }, [url])

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

    // const modules = {
    //     toolbar: [
    //       [{ 'header': [1, 2, false] }],
    //       ['bold', 'italic', 'underline','strike', 'blockquote'],
    //       [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    //       ['link', 'image'],
    //       ['clean']
    //     ],
    //   }
    
    //   const formats = [
    //     'header',
    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
    //     'list', 'bullet', 'indent',
    //     'link', 'image'
    //   ]
    
    return(
        <Layout>
            <div>
                {loading ? <div>Loading</div> :
                <div>
                    <h1>done loading find attached details</h1>
                    {/* <p>{userData}</p> */}
                </div>}
                {/* <form className='w-[50%]' onSubmit={updatePost}>
                        <input type='text' placeholder='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)}/> 
                        <input type='text' placeholder='summary' name='summary' value={summary} onChange={(e) => setSummary(e.target.value)}/>
                        <input type='file' accept='.png, .jpg, .jpeg' className='mb-[10px] mt-[5px]' onChange={(e) => setFile(e.target.files)}/>
                        <ReactQuill modules={modules} formats={formats} value={content} onChange={newValue => setContent(newValue)}/>
                        <button className='button' type='submit'>Create Post</button>
                    </form> */}
            </div>
        </Layout>
    )
}

export default EditIndexPost