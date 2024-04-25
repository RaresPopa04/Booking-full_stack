import { useContext, useState } from "react"
import "./login.css"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = ()=>{
    const [credentials,setCredentials] = useState({
        username:undefined,
        password:undefined
    })

    const {user,loading,error,dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e)=>{
        setCredentials(prev=>({
            ...prev, [e.target.id]:e.target.value
        }))
    }

    const handleClick = async e=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try {
            const response = await axios.post("/auth/login",credentials)
            dispatch({type:"LOGIN_SUCCESS",payload:response.data})
            navigate("/")
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE", payload:error.response.data.message})
        }
    }

    

    return(
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id= "username" onChange={handleChange} className="lInput" />
                <input type="password" placeholder="password" id= "password" onChange={handleChange} className="lInput" />
                <button onClick={handleClick} disableb={loading} className="lButton">Login</button>
                {
                    error != null && <span style={{color:"red",marginTop:"10px"}}>{error}</span>
                }
            </div>
        </div>
    )
}

export default Login