import React from "react";
import Layout from "../../layouts";
// import FeaturedPost from "../posts/featuredpost";
// import PostSlider from "../posts/postslider";
import Screen from "../posts/screen";


function Home(){
    return(
        <Layout>
            <Screen/>
            {/* <PostSlider/>
            <FeaturedPost/> */}
        </Layout>
    )
}
export default Home