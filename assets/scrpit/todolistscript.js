document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const dateInput = document.getElementById("taskDate");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const taskDate = dateInput.value;

        if (taskText !== "") {
            addTask(taskText, taskDate);
            taskInput.value = "";
            dateInput.value = "";
        }
    });

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    function addTask(taskText, taskDate) {
        const taskItem = document.createElement("li");
    
        const taskItemContent = {
            taskDate: taskDate,
            taskText: taskText
        };
    
        taskItem.innerHTML = `
            <label class="task-checkbox">
                <input type="checkbox">
                <span>${taskItemContent.taskDate} | ${taskItemContent.taskText}</span>
            </label>
            <button class="delete-button">삭제</button>
        `;
    
        taskList.appendChild(taskItem);
    
        const taskTextElement = taskItem.querySelector("span");
        const checkbox = taskItem.querySelector("input");
        const deleteButton = taskItem.querySelector(".delete-button");
    
        checkbox.addEventListener("change", function () {
            taskTextElement.classList.toggle("completed");
        });
    
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskItem);
        });
    }
    
});
