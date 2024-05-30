// import React, { useState } from 'react';
import { formatDate } from '../helper';
import TaskForm from './TaskForm';
import { useRef } from 'react';
import React, { useContext, useState } from 'react';
import TaskContext from '../context/TaskContext';



function Popup(props) {
    const { taskData } = props;
    const { isType, data } = taskData;
    const closeBtn = useRef(null)

    // const {deleteTask} = useContext(TaskContext)
    const { message, setMessage, deleteTask } = useContext(TaskContext);

    // const [message,setMessage] = useState("")

    const handleClick = () => {
        deleteTask(data?.id)
         .then(() => {
                setTimeout(() => {
                    setMessage("");
                    closeBtn.current.click();
                }, 2000);
            })
         .catch((error) => {
                setTimeout(() => {
                    setMessage("");
                }, 2000);
            });
    };
    

    return (
        <div className="modal" tabIndex="-1" id='todo-modal'>
            <div className="modal-dialog">
                <div className="modal-content bg-primary text-white">
                    <div className="modal-header">
                        <button ref={closeBtn} type="button" className="btn-close "  data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            isType === "view" ?
                                <div>{
                                    data ? <>
                                    <h4>{data.title}</h4>
                                    <p>{data.description}</p>
                                    <div className="d-flex align-items-center text-warning">
                                        <p className='mb-0'>{formatDate(data.modified)}</p>
                                        <p className='mb-0 ms-auto'>{formatDate(data.duedate)}</p>

                                    </div>
                                    </>: " "   
                                }
                                    </div>
                                : isType === "edit" ?
                                    <TaskForm isUpdate={true} isPop={true}  data={data} closeBtn={closeBtn}/>
                                    :
                                    <div className="py-2">
                                        {/* <p></p> */}
                                        <p>{message || "Are You Sure? You Want to delete the task." }</p>

                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-danger ms-auto" onClick={handleClick}>Yes</button>
                                        <button className="btn btn-warning ms-2" data-bs-dismiss="modal" >No</button>
                                    </div>


                                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
} 

export default Popup;