import styles from './card.module.css'

const Skeleton = () => {
    return(
        <div>
            <div className={styles.imgbox}/>
           
            <div className={styles.userinfo}>
                <span className='rounded-full' />
                <div>
                    <div className={`w-full h-[13px] mb-2 ${styles.details}`} />
                    <div className={`w-[70%] h-[13px] ${styles.details}`}/>
                </div>
            </div>

            <div>
                <p className={`h-[13px] ${styles.details}`}/>
                <p className={`h-[13px] my-2 ${styles.details}`}/>
                <p className={`h-[13px] mb-2 ${styles.details}`}/>
                <p className={`h-[13px] w-[70%] ${styles.details}`}/>
            </div>
        </div>
    )
}

export default Skeleton