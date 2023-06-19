import reddelete from "../Images/reddelete.png";
import star from "../Images/star.png";
import orangestar from "../Images/orangestar.png";

export default function TodoItems(props) {
    const { id, title, status,handleToggle, handleDelete,radioButtonClick} = props;

    return (
      <div className="alltodos">
           <div className="todo">
           <div className="todo--right ">
                <input type="radio" onClick={()=>radioButtonClick(id , title)}/>
                <span>{title} </span> 
            </div>
            <div className="todo--left">
            <img src={status? orangestar : star}
                className="todo--toggle"
                onClick={() => handleToggle(id)}
                alt="" />
           <img src={reddelete} className="todo--delete" onClick={() => handleDelete(id)} alt=""/>
            </div>  
            
            </div> 
            
      </div>
    );
  }
  