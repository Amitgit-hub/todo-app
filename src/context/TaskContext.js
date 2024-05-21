import { createContext, useState } from "react";

const TaskContext=createContext()


export const TaskProvider = ({children})=>{
    const [message, setMessage] = useState("")

    //add Task
    const addTask=async(formData)=>{
        const config= {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        }
        const response = await fetch("http://localhost:5000/tasks", config)
        if(response.status===201){
            setMessage("Task Created Successfully")
        } else {
            setMessage("Something Went Wrong")
        }
    }

    return (
        <TaskContext.Provider value={{message,setMessage,addTask}}>{
            children}
            </TaskContext.Provider>
    )
}

export default TaskContext