import styles from './card.module.css'


function NewsSkeleton(){
    return(
        <div className={styles.sidenews}>
            <div className={`h-full ${styles.details}`}/>
        <div className='flex flex-col'>
            <p className={`h-[13px] ${styles.details}`} />
            <span className={`h-[60px] my-2 ${styles.details}`}/>
            <p className={`h-[13px] ${styles.details} w-[80%]`} />
        </div>
    </div>
    )
}

export default NewsSkeleton