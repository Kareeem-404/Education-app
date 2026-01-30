import { useState } from "react"
import useGemini from "../../Hooks/useGemini"

export default function Input() {
    const [msg,SetMsg] = useState('')
    const {loading, MSG,response,sendMSG} = useGemini()

    function handleMsg() {
        sendMSG(msg)   
    }
    console.log(response?.candidates[0]?.content[0].parts[0]?.text || loading && "loading...." || "no response");
    return(
        <div className="flex flex-col justify-center items-center mt-120">
            <input value={msg} onChange={(e) => SetMsg(e.target.value)} className="flex justify-center items-center bg-blue-700 " />
            <button onClick={handleMsg}>Click</button> 
            <p></p>
            
        </div>
    )
}