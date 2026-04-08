const addBtn = document.querySelector("#addBtn");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const summary = document.querySelector("#summary");

const updateSummary = () => {
    const allTodos = todoList.querySelectorAll(".todo-item");         // all todo divs
    const completedTodos = todoList.querySelectorAll(".completed");   // spans with .completed class

    const total = allTodos.length;
    const completed = completedTodos.length;
    const remaining = total - completed;

    summary.textContent = `Total: ${total} | Completed: ${completed} | Remaining: ${remaining}`;
};

const todoArray = [];

const addTodo = (text, completed = false) =>{
    const todo = {text: text, completed :completed}
    todoArray.push(todo);

    const newDiv = document.createElement("div");
    newDiv.className = "todo-item";

    const span = document.createElement("span");
    
    span.textContent = text;

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Completed";
    completedBtn.className = "completed-btn";

    if(completed){
        span.classList.add("completed");
        completedBtn.textContent = "Undo";
    }

    completedBtn.addEventListener("click", () => {
        // if(span.style.textDecoration === "line-through") {
        //     span.style.textDecoration = "none";
        // } else {
        //     span.style.textDecoration = "line-through";
        // }   
        span.classList.toggle("completed");
        if(span.classList.contains("completed")){
            completedBtn.textContent="Undo";
            todo.completed = true;
        }
        else{
            completedBtn.textContent = "Completed";
            todo.completed = false;
        }
        localStorage.setItem("todoArray", JSON.stringify(todoArray));
        updateSummary();
    })

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";

    delBtn.addEventListener("click", () => {
        todoArray.splice(todoArray.indexOf(todo), 1);
        localStorage.setItem("todoArray", JSON.stringify(todoArray));   
        newDiv.remove();   
        updateSummary();
    })

    newDiv.appendChild(span);
    newDiv.appendChild(completedBtn);
    newDiv.appendChild(delBtn);

    todoList.appendChild(newDiv);
    

    localStorage.setItem("todoArray", JSON.stringify(todoArray));
    updateSummary();
}

addBtn.addEventListener("click" , ()=> {
    
    const text = todoInput.value.trim();

    if(!text) {
        alert("Please enter a todo item.");
        return;
    }
    addTodo(text);
    todoInput.value = "";   
})


todoInput.addEventListener("keydown", (event) => {
    if(event.key ==="Enter"){
        addBtn.click();
    }
})

const savedTodo = localStorage.getItem("todoArray");
if(savedTodo){
    JSON.parse(savedTodo).forEach(x => addTodo(x.text , x.completed));
}

// FINISHED