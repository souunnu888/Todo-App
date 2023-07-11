import reddelete from "../Images/reddelete.png";
import bluetick from "../Images/blueTick.png"

export default function CompletedTodoItems(props){
    const {id, title,created,completed,toggleCompletedTasks,handleDeleteCompletedTask} = props;

let dateSplit = completed.split(",")[1];

    return <div className="all--todos">
                <div className="todo">
                    <div className="todo--right ">
                        <img src={bluetick} alt="" className="bluetick" onClick={()=>toggleCompletedTasks(id,title,created)}/>
                        <span className="todo--des"> {title}{" "} 
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