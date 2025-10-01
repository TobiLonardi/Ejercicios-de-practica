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

    useEffect(()=>{
        getAllUsers()
    ,[]})

    const handleSubmit=(event)=>{
        event.preventDefault();
        //postUser
        setinput(defaultValue)
        
    }


    async function getAllUsers(){

    }

    return (
        <div className="body d-flex flex-column justify-content-center align-items-center">
            <h1>My Users</h1>
            <form action="" className="w-50 shadow-sm p-1 mb-5 bg-body-tertiary rounded" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" value={input.name} placeholder="Username" id="exampleName" name="name" />
                    <br />
                    <input type="text" value={input.email} placeholder="Email" id="exampleEmail" name="email" className="mt-2"/>
                    <ul>
                        {
                            users.map((item) =>
                                <li key={item.id} className="border-bottom m-1">{item.name} {item.email}
                                    <span onClick={() => deleteTask(item.id)}><i className="fa-solid fa-xmark"></i></span></li>
                            )
                        }
                    </ul>
                </div>

            </form>
        </div>
    )
}