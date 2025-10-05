import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Searcher } from "../components/Searcher"
import { Footer } from "../components/Footer"
import {NavBar} from "../components/NavBar"

export const Layout = () => {
    return (
        <ScrollToTop>
            <NavBar/>
            <Searcher/>
            <Outlet />
        </ScrollToTop>
    )
}