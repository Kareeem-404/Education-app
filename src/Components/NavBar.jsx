//================Router===========
import { Link } from "react-router"

export default function NavBar() {
    return(
        <>
            <nav className="flex flex-row w-full h-18 items-center justify-between bg-text">
                <div className="flex flex-row ">
                    <Link to={'/'}>WebSite Name</Link>
                </div>
            </nav>
        </>
    )
}