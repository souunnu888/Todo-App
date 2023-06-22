import reddelete from "../Images/reddelete.png";

export default function CompletedTodoItems(props){
    const {id, title,toggleCompletedTasks,handleDeleteCompletedTask} = props;


    return <div className="all--todos">
                <div className="todo">
                <div className="todo--right ">
                    <input type="radio" checked onClick={()=>toggleCompletedTasks(id,title)}/> 
                    <p >{title}</p>
                </div>
                <div className="todo--left">
                    <img src={reddelete} className="todo--delete" onClick={() => handleDeleteCompletedTask(id)} alt=""/>
                </div>
            </div>
            </div>  
}