import { useEffect, useState } from "react";
import TodoItems from "./TodoItems";
import AddTodo from "./AddTodo";
import Navbar from "./Navbar";
import TaskTitle from "./TaskTitle";
import reddelete from "../Images/reddelete.png";
import CompletedTasksTitle from "./CompletedTasksTitle";
import CompletedTodoItems from "./CompletedTodoItems";
import Footer from "./Footer"

let dates = new Date().toLocaleString();

let createdDate=[];

export default function Todo() {
  // const storedTodos = JSON.parse(sessionStorage.getItem("Todos") || "[]"); 
  // const storedCompletedTodos = JSON.parse(sessionStorage.getItem("CompletedTodos") || "[]");// getting stored Todos from session storage
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


  const saveTaskToStorage = (updatedTodos) =>{
   localStorage.setItem("Todos",JSON.stringify(updatedTodos));
  }

  const saveCompletedTaskToStorage = (updatedTodos) => {
    localStorage.setItem("CompletedTodos",JSON.stringify(updatedTodos))
  }

  const saveAllTasksToStorage = (updatedTodos) => {
    localStorage.setItem("AllTasks",JSON.stringify(updatedTodos))
  }


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

  const handleTaskArrow = () =>{
          setArrow((previousArrow) => !previousArrow)
  }

  const handleCompletedTaskArrow = () => {
          setCompletedTaskArrowArrow((previousArrow) => !previousArrow)
  }

 
  const handleSortingFunc = () =>{
    let originalTodo = JSON.parse(JSON.stringify(todos)) // deep 
    let updatedAscend = !ascend;
    let sortedTodo= updatedAscend ? originalTodo.sort( (a,b) => a.id- b.id) : originalTodo.sort( (a,b) => b.id- a.id) 
    setTodos(sortedTodo)
    saveTaskToStorage(sortedTodo)
    setAscend(updatedAscend)
  }

  const handleFavorite = (id) => {
        const updateTodos = todos.map((todo) =>
              todo.id === id ? { ...todo, status: !todo.status } : todo
        );
        setTodos(updateTodos); 
        saveTaskToStorage(updateTodos)
  };




  const handleFilter = () =>{
        setFiltered((prevState) => !prevState);
        let filteredTodos = todos.filter((todo) => todo.status === true);
        setAllTask(filteredTodos)
  }





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

  const handleFavoriteDelete = (id) => {
    handleDeleteTask(id);
    const deleteTodos = allTask.filter((todo) => todo.id !== id);
    setAllTask(deleteTodos);
    saveAllTasksToStorage(deleteTodos)
};



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

  let todosMap=new Map()
   todos.forEach((todo)=>{
    let date=todo.created.split(",")[0]
    let arr = []
    
    if(todosMap.has(date)){
        let value=todosMap.get(date);
        arr.push(value)
        todosMap.set(date,[...value,todo])
      }
      else{
        todosMap.set(date,[todo])
      }
})
const arrayOfObjects = Array.from(todosMap.entries()).map(([key, value]) => ({ key, value }));

 let completedTodosMap = new Map();
 isCompleted.forEach((el)=>{
  let date=el.completed.split(",")[0]
  let arr = [];

  if(completedTodosMap.has(date)){
    let value=completedTodosMap.get(date);
    arr.push(value)
    completedTodosMap.set(date,[...value,el])
  }
  else{
    completedTodosMap.set(date,[el])
  }
 })

 const completedArrayOfObjects = Array.from(completedTodosMap.entries()).map(([key, value]) => ({ key, value }));

  return (
    <>
      <div>
        <Navbar filtered={filtered} handleFilter = {handleFilter} handleSortingFunc={handleSortingFunc}/>

        <AddTodo handleAddTodo={handleAddTodo} />

        {filtered ? todos.length>0 &&  <TaskTitle title = "Favorites" handleTaskArrow={handleTaskArrow} arrow= {arrow}  handleAddTodo={handleAddTodo}/>
                  : todos.length>0 &&  <TaskTitle title = "Tasks" handleTaskArrow={handleTaskArrow} arrow= {arrow}  handleAddTodo={handleAddTodo}/>}



       {filtered ? arrow? allTask.length > 0 ? allTask.map((el, i) => (
            <TodoItems
              key={el.id}
              id={el.id}
              title={el.title}
              status={el.status}
              created={el.created}
              radioButtonClick={radioButtonClick}
              handleDelete={handleFavoriteDelete}
              handleToggle={handleFavorite}
            />
          )) : "No Favorites" : "" : arrow?  arrayOfObjects.map((item)=>(
            <>
               <p className="date">{item.key}</p>
               {item.value.map((el)=>(
                  <TodoItems
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  status={el.status}
                  created={el.created}
                  radioButtonClick={radioButtonClick}
                  handleDelete={handleDeleteTask}
                  handleToggle={handleFavorite}
                  />
               ))}
            </>
          )) : "Tasks Hidden"}

        {filtered ? "" : isCompleted.length>0 && <CompletedTasksTitle title = "Completed Tasks" handleCompletedTaskArrow={handleCompletedTaskArrow} arrow= {completedTaskArrow}/>}
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

             
           
            <Footer/>
      </div>
    </>
  );

}