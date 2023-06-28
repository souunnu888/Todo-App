import { useEffect, useState } from "react";
import TodoItems from "./TodoItems";
import AddTodo from "./AddTodo";
import Navbar from "./Navbar";
import TaskTitle from "./TaskTitle";
import reddelete from "../Images/reddelete.png";
import CompletedTasksTitle from "./CompletedTasksTitle";
import CompletedTodoItems from "./CompletedTodoItems";
import Footer from "./Footer"



export default function Todo() {
  // const storedTodos = JSON.parse(sessionStorage.getItem("Todos") || "[]"); 
  // const storedCompletedTodos = JSON.parse(sessionStorage.getItem("CompletedTodos") || "[]");// getting stored Todos from session storage
  const storedTodos = JSON.parse(localStorage.getItem("Todos") || "[]");
  const storedCompletedTodos = JSON.parse(localStorage.getItem("CompletedTodos") || "[]");
  const [todos, setTodos] = useState(storedTodos);
  const [isCompleted,setIsCompleted] = useState(storedCompletedTodos)
  const [arrow,setArrow] = useState(true);
  const [completedTaskArrow,setCompletedTaskArrowArrow] = useState(true);
  const [allTask,setAllTask] = useState([])
  const [filtered,setFiltered] = useState(false)
  const [ascend, setAscend]= useState(false)

  // Tried to use useEffect Hook for storing data in session storage
 
  // useEffect(()=>{
  //     const storedTodos = JSON.parse(sessionStorage.getItem("Todos") || "[]");
  //     setTodos(storedTodos);
  // },[])

  // useEffect(()=>{
  //     sessionStorage.setItem("Todos",JSON.stringify(todos));
  // },[todos])


  const saveTaskToStorage = (updatedTodos) =>{
   // sessionStorage.setItem("Todos",JSON.stringify(updatedTodos));
   localStorage.setItem("Todos",JSON.stringify(updatedTodos));
  }

  const saveCompletedTaskToStorage = (updatedTodos) => {
    localStorage.setItem("CompletedTodos",JSON.stringify(updatedTodos))
  }


  const handleAddTodo = (text) => {
          const newTodo = {
          title: text,
          status: false,
          id: Date.now(),
          created:new Date().getTime(),
        };
        const updatedTodos = [newTodo , ...todos]
        setTodos(updatedTodos);
        saveTaskToStorage(updatedTodos)
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





  const radioButtonClick = (id,title) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
          const newTodo = {
            title: title,
            status: false,
            id: id,
          };
          let updateTask = [...isCompleted,newTodo]
        setIsCompleted(updateTask);
        saveCompletedTaskToStorage(updateTask)
        setTodos(updatedTodos);
        saveTaskToStorage(updatedTodos)
  };




  const toggleCompletedTasks = (id,title) =>{
        const updatedTodos = isCompleted.filter((todo) => todo.id !== id);
        const newTodo = {
          title: title,
          status: false,
          id: id,
        };
        const updateTodos = [...todos , newTodo]
        setTodos(updateTodos);
        saveTaskToStorage(updateTodos)
        setIsCompleted(updatedTodos);
        saveCompletedTaskToStorage(updatedTodos)
  }

  return (
    <>
      <div>
        <Navbar filtered={filtered} handleFilter = {handleFilter} handleSortingFunc={handleSortingFunc}/>

        <AddTodo handleAddTodo={handleAddTodo} />

        {filtered ? todos.length>0 &&  <TaskTitle title = "Favorites" handleTaskArrow={handleTaskArrow} arrow= {arrow}  handleAddTodo={handleAddTodo}/>
                  : todos.length>0 &&  <TaskTitle title = "Tasks" handleTaskArrow={handleTaskArrow} arrow= {arrow}  handleAddTodo={handleAddTodo}/>}


       {filtered ? arrow?  allTask.map((el, i) => (
            <TodoItems
              key={el.id}
              id={el.id}
              title={el.title}
              status={el.status}
              radioButtonClick={radioButtonClick}
              handleDelete={handleDeleteTask}
              handleToggle={handleFavorite}
            />
          )) : "" : arrow?  todos.map((el, i) => (
            <TodoItems
              key={el.id}
              id={el.id}
              title={el.title}
              status={el.status}
              radioButtonClick={radioButtonClick}
              handleDelete={handleDeleteTask}
              handleToggle={handleFavorite}
            />
          )) : ""}

        {filtered ? "" : isCompleted.length>0 && <CompletedTasksTitle title = "Completed Tasks" handleCompletedTaskArrow={handleCompletedTaskArrow} arrow= {completedTaskArrow}/>}
        {filtered? "" : completedTaskArrow ?
             isCompleted.map((el,i)=>(
              <CompletedTodoItems
               key={el.id}
               id={el.id}
              title={el.title}
              status={el.status}
              toggleCompletedTasks={toggleCompletedTasks}
              handleDeleteCompletedTask={handleDeleteCompletedTask}/>
             )) :""}
            <Footer/>
      </div>
    </>
  );

}