import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const defaultValue = {
    "id": 0,
    "name": "",
    "email": ""
}
export const Exercise1 = () => {

    const [input, setinput] = useState(defaultValue);
    const [users, setUsers] = useState([]);

    const url = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        getAllUsers()
            
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        postUser()
        setinput(defaultValue)
        console.log("submited")

    }

    function handleKeyDown(event){
        if(event.key === "Enter" && input.name.trim()!=="" && input.email.trim()!==""){
            handleSubmit(event)
        }
    }

    function onChange(event) {
        setinput({
            ...input,
            [event.target.name]: event.target.value
        }
        )
    }


    async function getAllUsers() {
        const response = await fetch(`${url}api/users`)
        if(response.ok){
            const data = await response.json();
            setUsers(data)
        }
    }

    async function postUser(){
        const response = await fetch(`${url}/api/users`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(input)
        })
        if(response.ok){
            setinput(defaultValue)
            getAllUsers()
        }

    }
    async function getUser(id){
        const response = await fetch(`${url}/api/users/${id}`)
        if(response.ok){
            const data=await response.json();
            console.log(data.user.name)
        }
    }

    async function deleteUser(id){
        const response = await fetch(`${url}/api/users/${id}`,
            {method:"DELETE"}
        )
        if(response.ok){
            getAllUsers()
            console.log("borrado")
        }
    }

    return (
        <div className="body d-flex flex-column justify-content-center align-items-center">
            <h1>My Users</h1>
            <form action="" className="w-50 shadow-sm p-1 mb-5 bg-body-tertiary rounded">
                <div className="mb-3">
                    <input type="text" value={input.name} placeholder="Username" id="exampleName" name="name" onChange={onChange} onKeyDown={handleKeyDown}/>
                    <br />
                    <input type="text" value={input.email} placeholder="Email" id="exampleEmail" name="email" className="mt-2" onChange={onChange} onKeyDown={handleKeyDown}/>
                    <ul>
                        {
                            users.map((item) =>
                                <li key={item.id} className="border-bottom m-1">{item.name} {item.email}
                                    <span>
                                        <i className="fa-solid fa-xmark"  onClick={() => deleteUser(item.id)}></i>
                                        <i className="fa-solid fa-magnifying-glass" onClick={()=>getUser(item.id)}></i>
                                    </span>
                                </li>

                                    
                            )
                        }
                    </ul>
                </div>

            </form>
        </div>
    )
}