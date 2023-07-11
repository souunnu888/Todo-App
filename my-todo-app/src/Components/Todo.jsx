import { useState } from "react";
import TodoItems from "./TodoItems";
import AddTodo from "./AddTodo";
import Navbar from "./Navbar";
import TaskTitle from "./TaskTitle";
import CompletedTasksTitle from "./CompletedTasksTitle";
import CompletedTodoItems from "./CompletedTodoItems";
import Footer from "./Footer"


export default function Todo() {

  // getting todos and completed todos from local storage

  const storedTodos = JSON.parse(localStorage.getItem("Todos") || "[]");
  const storedCompletedTodos = JSON.parse(localStorage.getItem("CompletedTodos") || "[]");
  const storedAllTasks = JSON.parse(localStorage.getItem("AllTasks") || "[]");
  
  const [todos, setTodos] = useState(storedTodos);
  const [isCompleted,setIsCompleted] = useState(storedCompletedTodos)
  const [arrow,setArrow] = useState(true);
  const [completedTaskArrow,setCompletedTaskArrowArrow] = useState(true);
  const [allTask,setAllTask] = useState([])
  const [filtered,setFiltered] = useState(false)
  const [ascend, setAscend]= useState(false)
  const [editTaskId, setEditTaskId] = useState(null)
  const [inputValue, setInputValue] = useState('');

// storing todos and completed todos in local storage
  const saveTaskToStorage = (updatedTodos) =>{
   localStorage.setItem("Todos",JSON.stringify(updatedTodos));
  }

  const saveCompletedTaskToStorage = (updatedTodos) => {
    localStorage.setItem("CompletedTodos",JSON.stringify(updatedTodos))
  }

  const saveAllTasksToStorage = (updatedTodos) => {
    localStorage.setItem("AllTasks",JSON.stringify(updatedTodos))
  }

//function responsible to add all new todos
  const handleAddTodo = (text) => {
     if(text.trim() !== ''){
        const newTodo = {
          title: text,
          status: false,
          id: Date.now(),
          created:new Date().toLocaleString(),
        };
        const updatedTodos = [newTodo , ...todos]
        setTodos(updatedTodos);
        saveTaskToStorage(updatedTodos)
    }else{
        alert('Empty Task Input..!');
    }
 };

 // function responsible for adding todos on pressing Enter key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if(editTaskId !== null){
        editTask()
      }else{
        inputValue && handleAddTodo(inputValue);
        setInputValue("")
      }
    }
  };

  // function responsible for capturing input value on every change
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // functions responsible to change Arrows
  const handleTaskArrow = () =>{
    setArrow((previousArrow) => !previousArrow)
  }

  const handleCompletedTaskArrow = () => {
    setCompletedTaskArrowArrow((previousArrow) => !previousArrow)
  }

 // function responsible for sorting todos ascending or descending according to time stamp while creating
  const handleSortingFunc = () =>{
    let originalTodo = JSON.parse(JSON.stringify(todos)) // deep cloning
    let updatedAscend = !ascend;
    let sortedTodo= updatedAscend ? originalTodo.sort( (a,b) => a.id- b.id) : originalTodo.sort( (a,b) => b.id- a.id) 
    setTodos(sortedTodo)
    saveTaskToStorage(sortedTodo)
    setAscend(updatedAscend)
  }

  // function responsible to add todos to favorite todos(allTask)
  const handleFavorite = (id) => {
        const updateTodos = todos.map((todo) =>
              todo.id === id ? { ...todo, status: !todo.status } : todo
        );
        const updatedFavoriteTodos = allTask.filter((todo)=> todo.id !==id);
        setAllTask(updatedFavoriteTodos)
        setTodos(updateTodos);
        saveTaskToStorage(updateTodos)
  };

  const handleFilter = () =>{
        setFiltered((prevState) => !prevState);
        let filteredTodos = todos.filter((todo) => todo.status === true);
        setAllTask(filteredTodos)
  }

  // Below 2 functions are responsible for deleting todos and completed todos
  const handleDeleteTask = (id) => {
        const deleteTodos = todos.filter((todo) => todo.id !== id);
        setTodos(deleteTodos);
        saveTaskToStorage(deleteTodos)
  };

  const handleDeleteCompletedTask = (id) => {
        const deleteTodos = isCompleted.filter((todo) => todo.id !== id);
        setIsCompleted(deleteTodos);
        saveCompletedTaskToStorage(deleteTodos)
  };

  //Below 2 functions are responsible for adding todos to completed todos and completed todos to todos
  const radioButtonClick = (id,title,created) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
          const newTodo = {
            title: title,
            status: false,
            id: id,
            completed:new Date().toLocaleString(),
            created:created,
          };
          let updateTask = [newTodo,...isCompleted]
        setIsCompleted(updateTask);
        saveCompletedTaskToStorage(updateTask)
        setTodos(updatedTodos);
        saveTaskToStorage(updatedTodos);
        setFiltered(false);
  };

  const toggleCompletedTasks = (id,title,created) =>{
        const updatedTodos = isCompleted.filter((todo) => todo.id !== id);
        const newTodo = {
          title: title,
          status: false,
          id: id,
          created:created,
        };
        const updateTodos = [...todos,newTodo]
        setTodos(updateTodos);
        saveTaskToStorage(updateTodos)
        setIsCompleted(updatedTodos);
        saveCompletedTaskToStorage(updatedTodos)
  }

  // functions responsible for editing todo
  const handleEditFunction =(id)=>{
    // console.log("clicked",id)
    const taskToEdit = todos.find((todo) => todo.id === id);
    if (taskToEdit) {
      setInputValue(taskToEdit.title);
      setEditTaskId(id);
    }
  }

  const editTask = () => {
    if (editTaskId !== null && inputValue.trim() !== '') {
      const updatedTasks = todos.map((todo) => {
        if (todo.id === editTaskId) {
          return { ...todo, title: inputValue };
        }
        return todo;
      });
      setTodos(updatedTasks);
      saveTaskToStorage(updatedTasks);
      setInputValue('');
      setEditTaskId(null);
    }
  };

  const cancelEdit = () => {
    setInputValue('');
    setEditTaskId(null);
  };

// Grouping Todos and Completed Todos according to created and completed Dates
  let todosMap=new Map()
  todos.forEach((todo)=>{
    let date=todo.created.split(",")[0]
    
    if(todosMap.has(date)){
      let value=todosMap.get(date);
      todosMap.set(date,[...value,todo])
    }else{
      todosMap.set(date,[todo])
    }
  })
  const arrayOfObjects = Array.from(todosMap.entries()).map(([key, value]) => ({ key, value })); // converting Objects to arrays

  let completedTodosMap = new Map();
  isCompleted.forEach((el)=>{
    let date=el.completed.split(",")[0]
  
    if(completedTodosMap.has(date)){
      let value=completedTodosMap.get(date);
      completedTodosMap.set(date,[...value,el])
    }else{
      completedTodosMap.set(date,[el])
    }
  })

 const completedArrayOfObjects = Array.from(completedTodosMap.entries()).map(([key, value]) => ({ key, value })); // converting Objects to arrays



  return (
    <>
      <div>
        {/* Navbar Component */}
        <Navbar filtered={filtered} handleFilter = {handleFilter} handleSortingFunc={handleSortingFunc}/> 

        {/* AddTodo Component */}
        <AddTodo editTaskId = {editTaskId} inputValue={inputValue} handleKeyPress={handleKeyPress} handleChange={handleChange} editTask={editTask} cancelEdit={cancelEdit}/> 

        {/* if Filtered is true display title as Favorite todos else all tasks */}
        {filtered ? allTask.length>0 ?  <TaskTitle title = "Favorites" handleTaskArrow={handleTaskArrow} arrow= {arrow}  handleAddTodo={handleAddTodo}/>:<div className="no--favorite">No Favorites</div>
                  : todos.length>0 &&  <TaskTitle title = "Tasks" handleTaskArrow={handleTaskArrow} arrow= {arrow}  handleAddTodo={handleAddTodo}/>} 

        {/* if Filtered is true display Favorite todos else all todos */}
        {filtered ? arrow? allTask.map((el) => (
            <TodoItems
              key={el.id}
              id={el.id}
              title={el.title}
              status={el.status}
              created={el.created}
              filter={filtered}
              radioButtonClick={radioButtonClick}
              handleToggle={handleFavorite}
              //handleDelete={handleDeleteTask}
            />
          )): "" : arrow?  arrayOfObjects.map((item)=>(
            <>
               <p className="date">{item.key}</p>
               {item.value.map((el)=>(
                  <TodoItems
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  status={el.status}
                  created={el.created}
                  filter={filtered}
                  radioButtonClick={radioButtonClick}
                  handleDelete={handleDeleteTask}
                  handleToggle={handleFavorite}
                  editButton={handleEditFunction}
                  
                  />
               ))}
            </>
          )) :""}

          
          {/* if Filtered is true display Nothing else Display title as Completed tasks */}
          {filtered ? "" : isCompleted.length>0 && <CompletedTasksTitle title = "Completed Tasks" handleCompletedTaskArrow={handleCompletedTaskArrow} arrow= {completedTaskArrow}/>}

          {/* if Filtered is true display Nothing else Display all Completed tasks */}
          {filtered? "" : completedTaskArrow ?
             completedArrayOfObjects.map((item)=>(
              <>
                <p className="date">{item.key}</p>
                {item.value.map((el)=>(
                  <CompletedTodoItems
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    status={el.status}
                    created={el.created}
                    completed={el.completed}
                    handleDeleteCompletedTask={handleDeleteCompletedTask}
                    toggleCompletedTasks={toggleCompletedTasks}
                  />
                 ))}
              </>
            )):""}

          {/* Footer component */}
          <Footer/>
      </div>
    </>
  );

}