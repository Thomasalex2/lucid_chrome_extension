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
        const formattedItemsArray = itemsArray.map(item => item.trim());
        console.log(formattedItemsArray)
        setTaskList(() => [...taskList, ...formattedItemsArray]);
        setTaskText("");
        setShowTaskInputField(() => false);
    }

    const clearAllTasks = () => {
        setTaskList(() => []);
        setShowTaskInputField(() => true);
    }

    const handleTask = (e) => {
        if (e.target.checked) {
            const newTaskList = JSON.parse(localStorage.getItem("taskList"));
            const index = newTaskList.indexOf(e.target.value);
            newTaskList.splice(index, 1);
            localStorage.setItem("taskList", JSON.stringify(newTaskList))
            console.log(e.target.value, " task removed");
        } else {
            const newTaskList = JSON.parse(localStorage.getItem("taskList"));
            newTaskList.push(e.target.value);
            localStorage.setItem("taskList", JSON.stringify(newTaskList))
            console.log(e.target.value, " task re-added");
        }
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
                <div className="task-box">
                    {taskList.map((item) => 
                        <div className="checkList" key={item}>
                            <input value={item} type="checkbox" onClick={handleTask} /><span className="item-text">{item}</span>
                        </div>
                    )}
                </div>
                <div className="task-btn-container">
                    <button onClick={() => setShowTaskInputField(() => true)}><span className="material-icons">add</span>&nbsp; Add Task</button>
                    <button onClick={() => clearAllTasks()}><span className="material-icons">close</span>&nbsp; Clear all Tasks</button>
                </div>
            </>
        )
    }
}