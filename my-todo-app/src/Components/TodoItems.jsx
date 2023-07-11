import reddelete from "../Images/reddelete.png";
import star from "../Images/star.png";
import orangestar from "../Images/orangestar.png";
import edit from"../Images/edit1.png"
import bluecircle from "../Images/bluecircle.png"

export default function TodoItems(props) {
  const {
    id,
    title,
    status,
    created,
    handleToggle,
    filter,
    handleDelete,
    radioButtonClick,
    editButton
  } = props;
 
  //created - created time - "11/09/2023 , 10:49:23 am" then spliting it to get only date
  let dateSplit = created.split(",")[1];

  return (
    <>
    <div className="all--todos">
      <div className="todo">
          <div className="todo--right "> 
          <img src={bluecircle} alt="" className="bluecircle" onClick={() => radioButtonClick(id, title,created)}/>
            <span className="todo--desc">
              {title}{" "}
              <span className="created--time">
                {dateSplit.split(" ")[0]}{dateSplit.split(" ")[1].split(":")[0]}:{dateSplit.split(" ")[1].split(":")[1]} {dateSplit.split(" ")[2]}
              </span>
            </span>
          </div>
          <div className="todo--left">
            <span className="todo--created_date">{filter?created.split(",")[0]:""}</span> {/* Show date only for favorite Todos */}
            <img
              src={status ? orangestar : star}
              className="todo--toggle"
              onClick={() => handleToggle(id)}
              alt="" title="Add to Favorites"
            />
            {filter ? "" : <img className="todo--edit_icon" src={edit} alt="" title="Edit Task" onClick={()=>editButton(id)}/>} {/* edit and delete buttons are deleted in favorite todos */}
            {filter?"":<img
              src={reddelete}
              className="todo--delete"
              onClick={() => handleDelete(id)}
              alt="" title="Delete Task"
            />}
          </div>
        </div>
    </div>
    </>
  );
}
