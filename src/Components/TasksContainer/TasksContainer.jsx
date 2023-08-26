/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";
import TaskCard from "../TaskCard/TaskCard";
import './TasksContainer.css'

const TasksContainer = ({taskStaus, indicatorcolor}) => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        fetch(`https://task-management-server-saimun5656.vercel.app/tasks/${taskStaus}`)
            .then(res => res.json())
            .then(data => setTasks(data))
    },[])
    return (
        <div className="bg-[#dedcdc] py-2 space-y-2 w-[490px] ">
            <div className="flex justify-between px-2">
                <p className="flex gap-2">
                    <span style={{backgroundColor:indicatorcolor}} className={`block  w-6 h-6 rounded-l-full`}></span>
                    {taskStaus}
                </p>
                <p className="bg-[white] inline-block px-3 py-[2px] rounded-sm font-bold">
                    {tasks.length}
                </p>
            </div>
            <div className=" h-[87vh] overflow-y-auto space-y-3 task-list">
            {
                tasks.map((task,idx) => <TaskCard idx={idx} key={task._id} task={task}></TaskCard>)
            }
            </div>
            
        </div>
    );
};

export default TasksContainer;