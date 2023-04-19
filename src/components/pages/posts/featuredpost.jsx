import styles from '../../module/custom.module.css'

export default function FeaturedPost(){
    return(
        <section className='max-w-[1240px] mx-auto text-[14px]'>
            <div className='px-6'>
                <div className='py-8 text-center'>
                    <h2 className='text-2xl'>TOP STORIES</h2>
                </div>
                <div className={styles.features}>
                    <div className={styles.feature_displaycontainer}>
                        <div className={styles.feature_displaybg}>
                            <div className={styles.featuredcontent}>
                                <h2 className='text-2xl mb-3'>The Ultimate African Safari guide (from a safari guide)</h2>
                                <div className='text-sm'>
                                    <h2>#TRAVEL TIPS</h2>
                                    <span>by Dominic Oliver</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.parent}>
                            <div className={`${styles.bg1} ${styles.child}`} />
                        </div>
                        <div>
                            <h2 className='font-bold my-2'>Want to find Love ? Maybe travelling with contiki is the answer...</h2>
                            <div className='text-sm text-[#727272]'>
                                <h2>#MYCONTIKI STORY</h2>
                                <span>by Dominic Oliver</span> 
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.parent}>
                            <div className={`${styles.bg2} ${styles.child}`} />
                        </div>
                        <div>
                            <h2 className='font-bold my-2'>Where was Wednesday filmed? The glam gothic locations you can visit IRL</h2>
                            <div className='text-sm text-[#727272]'>
                                <h2>#POP CULTURE</h2>
                                <span>by Dominic Oliver</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center bg-[#F1FFF1]'> 
                        <div className='w-[300px] text-center'>
                            <h2 className='text-2xl'>For travellers and adventurers</h2>
                            <p>A little corner of the internet dedicated to delivering you the travel inspiration goods on the daily.</p>
                            <button className='p-2'>LEARN MORE</button>  
                        </div>
                    </div>
                    <div>
                        <div className={styles.parent}>
                            <div className={`${styles.bg5} ${styles.child}`} />
                        </div>
                        <div>
                            <h2 className='font-bold my-2'>LGBTQIA+  Ambassador Aisha Shaibu-Lenoir on how to uncover a surprising side to Britain</h2>
                            <div className='text-sm text-[#727272]'>
                                <h2>#MYCONTIKI STORY</h2>
                                <span>by Dominic Oliver</span> 
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.parent}>
                            <div className={`${styles.bg5} ${styles.child}`}></div>
                        </div>
                        <div>
                            <h2 className='font-bold'>What to pack for the zombie apocalypse (The Last of Us)</h2>
                            <div className='text-sm text-[#727272]'>
                                <h2>#MYCONTIKI STORY</h2>
                                <span>by Dominic Oliver</span> 
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </section>
    )
}