import reddelete from "../Images/reddelete.png";

export default function CompletedTodoItems(props){
    const {id, title,created,completed,toggleCompletedTasks,handleDeleteCompletedTask} = props;

let dateSplit = completed.split(",")[1];

    return <div className="all--todos">
        
                <div className="todo">
                <div className="todo--right ">
                    <input type="radio" checked onClick={()=>toggleCompletedTasks(id,title,created)}/> 
                    <span className="todo--desc">
              {title}{" "}
              <span className="created--time">
                {dateSplit.split(" ")[0]}{dateSplit.split(" ")[1].split(":")[0]}:{dateSplit.split(" ")[1].split(":")[1]} {dateSplit.split(" ")[2]}
              </span>
            </span>
                </div>
                <div className="todo--left">
                    <img src={reddelete} className="todo--delete" onClick={() => handleDeleteCompletedTask(id)} alt=""/>
                </div>
            </div>
            </div>  
}