import { useState } from "react";
import darrow from "../Images/downarrow.png";
import sarrow from "../Images/sidearrow.png";
import TodoItems from "./TodoItems";
import AddTodo from "./AddTodo";
import Navbar from "./Navbar";
import TaskTitle from "./TaskTitle";
import reddelete from "../Images/reddelete.png";
import star from "../Images/star.png";
import orangestar from "../Images/orangestar.png";
import CompletedTodoItems from "./CompletedTodoItems";
import CompletedTasksTitle from "./CompletedTasksTitle";




export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [isCompleted,setIsCompleted] = useState([])
  const [arrow,setArrow] = useState(true);
  const [completedTaskArrow,setCompletedTaskArrowArrow] = useState(true);
  const [allTask,setAllTask] = useState([])
  // const [filtered,setFiltered] = useState([])


  const handleAddTodo = (text) => {
    const newTodo = {
    title: text,
    status: false,
    id: new Date().toDateString(),
   };
   setTodos((prevstate)=>[newTodo,...prevstate]);
  //  setAllTask([newTodo,...allTask])
 };


const handleTaskArrow = () =>{
    setArrow((previousArrow) => !previousArrow)
}


const handleCompletedTaskArrow = () => {
    setCompletedTaskArrowArrow((previousArrow) => !previousArrow)
}


// const handleCompletedFavorite = (id) => {
//     const updateTodos = isCompleted.map((todo) =>
//           todo.id === id ? { ...todo, status: !todo.status } : todo
//     );
//   setIsCompleted(updateTodos);
// };


const handleFavorite = (id) => {
    const updateTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    setTodos(updateTodos);
    // setAllTask(updateTodos)
};


const handleFilter = () =>{
    setAllTask([...todos])
    let filteredTodos = todos.filter((todo) => todo.status === true);
    setTodos(filteredTodos)
}

const handleDeleteTask = (id) => {
    const deleteTodos = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodos);
    // setAllTask(deleteTodos)
};


const handleDeleteCompletedTask = (id) => {
    const deleteTodos = isCompleted.filter((todo) => todo.id !== id);
    setIsCompleted(deleteTodos);
};


const radioButtonClick = (id,title) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
      // const CompletedTodoItems = todos.filter((todo) => todo.id === id);
      const newTodo = {
        title: title,
        status: false,
        id: id,
       };
    setIsCompleted([...isCompleted,newTodo])
    setTodos(updatedTodos);
    // setAllTask(updatedTodos)
};

const showAllTasks = () =>{
 const alltasks = (arrow ?
    allTask.map((el,i)=>(
     <div className="alltodos">
     <div className="todo">
       <div className="todo--right ">
           <input type="radio" onclick={radioButtonClick} />
           <p>{el.title}</p>
       </div>
       <div className="todo--left">
           <img src={el.status? orangestar : star} className="todo--toggle" onClick={() => handleFavorite(el.id)} alt="" />
           <img src={reddelete} className="todo--delete" onClick={() => handleDeleteCompletedTask(el.id)} alt=""/>
       </div>
    </div>
    </div> 
    )) :"")
  return alltasks;
}
  


  return (
    <>
      <div>
        <Navbar handleFilter={handleFilter}/>

        <AddTodo handleAddTodo={handleAddTodo} />
        
       {todos.length>0 &&  <TaskTitle title = "Tasks" handleTaskArrow={handleTaskArrow} arrow= {arrow}  showAllTasks={showAllTasks} handleAddTodo={handleAddTodo}/>}

       
          
       {arrow?  todos.map((el, i) => (
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

        {isCompleted.length>0 && <CompletedTasksTitle title = "Completed Tasks" handleCompletedTaskArrow={handleCompletedTaskArrow} arrow= {completedTaskArrow}/>}

        {completedTaskArrow ?
             isCompleted.map((el,i)=>(
              <div className="alltodos">
              <div className="todo">
                <div className="todo--right ">
                    <input type="radio" checked/>
                    <p>{el.title}</p>
                </div>
                <div className="todo--left">
                    {/* <img src={el.status? orangestar : star} className="todo--toggle" onClick={() => handleCompletedFavorite(el.id)} alt="" /> */}
                    <img src={reddelete} className="todo--delete" onClick={() => handleDeleteCompletedTask(el.id)} alt=""/>
                </div>
             </div>
             </div> 
             )) :""}

      </div>
    </>
  );

}