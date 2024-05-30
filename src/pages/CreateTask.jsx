import React, { useContext, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskContext from "../context/TaskContext";
import { formatDate } from "../helper";

function CreateTask(props) {
  const { latestTask, recentTasks } = useContext(TaskContext);
  const [isUpdate, setIsUpdate] = useState(false);

  const edit = () => {
    setIsUpdate(true);
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column text-white bg-primary">
          <div className="w-50">
          <TaskForm
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            data={latestTask}
            />
            </div>
        </div>

        <div className="col-lg-6 h-100 d-flex align-items-center justify-content-center flex-column">
          <div className="card w-75 bg-primary text-white p-3">
            <div className="d-flex align-items-center">
              <h4>Latest Task</h4>
              <button className="btn btn-info ms-auto" onClick={edit}>
                Edit Task
              </button>
            </div>
            {latestTask ? (
              <div className="py-3">
                <h5>{latestTask.title}</h5>
                <p>{latestTask.description}</p>
                <div className="d-flex align-items-center">
                  <p>Modified On: {formatDate(latestTask.modified)}</p>
                  <p className="ms-auto">
                    Due Date: {formatDate(latestTask.duedate)}
                  </p>
                </div>
              </div>
            ) : (
              <p>No latest task available</p>
            )}
          </div>
          <div className="w-75 mt-4 bg-primary text-white rounded">
            <h4>Recent Tasks</h4>
            <div className="row bg-primary text-white">
              {recentTasks && recentTasks.length > 0 ? (
                recentTasks.slice(-3).map((task) => (
                  <div key={task.id} className="col-12 mb-3">
                       
                    <div className="card bg-primary text-white">
                        <h5 className="card-title">{task.title}</h5>
                        <div className="d-flex align-items-center">
                          <p className="ms-auto">Due Date: {formatDate(task.duedate)}</p>
                        </div>
                      </div>
                    </div>
                  
                ))
              ) : (
                <p>No recent tasks available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
