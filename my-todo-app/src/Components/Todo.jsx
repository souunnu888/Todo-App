import { useState } from "react";
import TodoItems from "./TodoItems";
import AddTodo from "./AddTodo";
import Navbar from "./Navbar";
import TaskTitle from "./TaskTitle";
import reddelete from "../Images/reddelete.png";
import CompletedTasksTitle from "./CompletedTasksTitle";




export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [isCompleted,setIsCompleted] = useState([])
  const [arrow,setArrow] = useState(true);
  const [completedTaskArrow,setCompletedTaskArrowArrow] = useState(true);
  const [allTask,setAllTask] = useState([])
  const [filtered,setFiltered] = useState(false)
  const [ascend, setAscend]= useState(false)





  const handleAddTodo = (text) => {
          const newTodo = {
          title: text,
          status: false,
          id: Date.now(),
          created:new Date().getTime(),
        };
        setTodos((prevstate)=>[newTodo,...prevstate]);
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
    setAscend(updatedAscend)
  }

  const handleFavorite = (id) => {
        const updateTodos = todos.map((todo) =>
              todo.id === id ? { ...todo, status: !todo.status } : todo
        );
        setTodos(updateTodos);
  };




  const handleFilter = () =>{
        setFiltered((prevState) => !prevState);
        let filteredTodos = todos.filter((todo) => todo.status === true);
        setAllTask(filteredTodos)
  }





  const handleDeleteTask = (id) => {
        const deleteTodos = todos.filter((todo) => todo.id !== id);
        setTodos(deleteTodos);
  };


  const handleDeleteCompletedTask = (id) => {
        const deleteTodos = isCompleted.filter((todo) => todo.id !== id);
        setIsCompleted(deleteTodos);
  };





  const radioButtonClick = (id,title) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
          const newTodo = {
            title: title,
            status: false,
            id: id,
          };
        setIsCompleted([...isCompleted,newTodo])
        setTodos(updatedTodos);
  };




  const toggleCompletedTasks = (id,title) =>{
        const updatedTodos = isCompleted.filter((todo) => todo.id !== id);
        const newTodo = {
          title: title,
          status: false,
          id: id,
        };
        setTodos([...todos,newTodo]);
        setIsCompleted(updatedTodos);
  }

  return (
    <>
      <div>
        <Navbar filtered={filtered} handleFilter = {handleFilter} handleSortingFunc={handleSortingFunc}/>

        <AddTodo handleAddTodo={handleAddTodo} />

        {filtered ? todos.length>0 &&  <TaskTitle title = "Favorites" handleTaskArrow={handleTaskArrow} arrow= {arrow}  handleAddTodo={handleAddTodo}/>
                  : todos.length>0 &&  <TaskTitle title = "Tasks" handleTaskArrow={handleTaskArrow} arrow= {arrow}  handleAddTodo={handleAddTodo}/>}

        {todos.length>0 && <span className="task--timestamp">{new Date().toLocaleDateString()}</span>}

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
              <div className="alltodos">
              <div className="todo">
                <div className="todo--right ">
                    <input type="radio" checked onClick={()=>toggleCompletedTasks(el.id,el.title)}/> 
                    <p >{el.title}</p>
                </div>
                <div className="todo--left">
                    <img src={reddelete} className="todo--delete" onClick={() => handleDeleteCompletedTask(el.id)} alt=""/>
                </div>
             </div>
             </div> 
             )) :""}


             <div className="todo--app">
                <footer className="footer">
                    <p>@Powered by Insure Pro 2.0</p>
                </footer>
            </div>
      </div>
    </>
  );

}