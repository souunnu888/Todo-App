import reddelete from "../Images/reddelete.png";

export default function CompletedTodoItems(props){
    const {id, title,created,completed,toggleCompletedTasks,handleDeleteCompletedTask} = props;

console.log(created.split(",")[0])

console.log(completed.split(",")[0])
    return <div className="all--todos">
        
                <div className="todo">
                <div className="todo--right ">
                    <input type="radio" checked onClick={()=>toggleCompletedTasks(id,title,created)}/> 
                    <p >{title}</p>
                    <span className="created--time">
                      {completed.split(",")[1]}
                    </span>
                </div>
                <div className="todo--left">
                    <img src={reddelete} className="todo--delete" onClick={() => handleDeleteCompletedTask(id)} alt=""/>
                </div>
            </div>
            </div>  
}