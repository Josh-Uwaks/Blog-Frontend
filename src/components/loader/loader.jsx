import React from 'react'
import styles from './loader.module.css'

function Loader(){
    return(
        <div className={styles.loader_container}>
            <div className={styles.spinner} />
        </div>
    )
}

export default Loader;