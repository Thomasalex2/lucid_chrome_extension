import { useState, useEffect } from "react";

export const TaskComponent = () => {

    const [showTaskInputField, setShowTaskInputField] = useState(true);
    const [taskText, setTaskText] = useState("");
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const localItems = JSON.parse(localStorage.getItem("taskList"));
        if (localItems !== null && localItems.length > 0) {
            setTaskList(() => localItems);
            setShowTaskInputField(() => false);
        }
    }, []);

    useEffect(() => localStorage.setItem("taskList", JSON.stringify(taskList)), [taskList]);

    const saveTask = (item) => {
        const itemsArray = item.split(";");
        itemsArray.map(item => item.trim());
        setTaskList(() => [...taskList, ...itemsArray]);
        setTaskText("");
        setShowTaskInputField(() => false);
    }

    const clearAllTasks = () => {
        setTaskList(() => []);
        setShowTaskInputField(() => true);
    }

    if (showTaskInputField) {
        return (
            <>
                <h3> What is your focus today?</h3>
                <input className="focus-input" type="text" autoFocus onKeyDown={(e) => e.key === "Enter" ? saveTask(e.target.value) : null} defaultValue={taskText} />
            </>
        )
    } else {
        return (
            <>
                <h3> Your tasks for today:</h3>
                {taskList.map((item) => 
                    <div className="checkList" key={item}>
                        <input value={item} type="checkbox" /><span>{item}</span>
                    </div>
                )}
                <div className="task-btn-container">
                    <button onClick={() => setShowTaskInputField(() => true)}><span className="material-icons">add</span>&nbsp; Add Task</button>
                    <button onClick={() => clearAllTasks()}><span className="material-icons">close</span>&nbsp; Clear all Tasks</button>
                </div>
            </>
        )
    }
}