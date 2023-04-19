import styles from './card.module.css'

const CardBox = ({children, getClasses}) => {
    const style = ``
    return(
        <div className={`${getClasses} ${style} ${styles.layout}`}>
            {children}
        </div>
    )
}

export default CardBox