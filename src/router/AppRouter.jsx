// ====================Routes===================
import { Routes, Route } from "react-router-dom";


//===================Components================
import Home from "../Pages/Home";

export default function AppRouter() {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )
}