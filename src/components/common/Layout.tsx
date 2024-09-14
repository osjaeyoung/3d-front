import React from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"

interface LayoutProps {
    className?: string;
}

export const Layout = ({ className, children }:React.PropsWithChildren<LayoutProps>) => {
    return (
        <div className={className}>
            <Header/>
                {children}
            <Footer/>
        </div>
    )
}