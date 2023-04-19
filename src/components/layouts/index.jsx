import React from "react";
import Navbar from "./navbar/navbar";
import '../../index.css'

function Layout({children}){
    return (
        <main className="layout">
            <Navbar/>
            {children}
        </main>
    )
}

export default Layout