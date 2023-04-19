import React from 'react'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'

function Indexpost({ _id,title, content, summary, createdAt, cover, author}){
    return(
        <div className='flex'>
            <div className=''>
                <div>
                    <Link to={`/post/${_id}`}>
                        <img src={'http://localhost:3000/'+cover} alt='drone'/>
                    </Link>
                </div>
                <div>
                    <Link to={`/post/${_id}`}>
                        <h2>{title}</h2>
                    </Link>
                    <p>
                        <a href="author">{author.username} {" "}</a>
                        <time>{formatISO9075(new Date(createdAt))}</time>
                    </p>
                    <p dangerouslySetInnerHTML={{__html: content}} />
                </div>
            </div>
        </div>
    )
}
export default Indexpost