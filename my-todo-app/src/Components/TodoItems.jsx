import reddelete from "../Images/reddelete.png";
import star from "../Images/star.png";
import orangestar from "../Images/orangestar.png";

export default function TodoItems(props) {
  const {
    id,
    title,
    status,
    created,
    handleToggle,
    tasksByDate,
    handleDelete,
    radioButtonClick,
  } = props;

  let dateSplit = created.split(",")[1];

  return (
    <>
    <div className="all--todos">
      <div className="todo">
          <div className="todo--right ">
            <input type="radio" onClick={() => radioButtonClick(id, title,created)} />
            <span>
              {title}{" "}
              <span className="created--time">
                {dateSplit.split(" ")[0]}{dateSplit.split(" ")[1].split(":")[0]}:{dateSplit.split(" ")[1].split(":")[1]} {dateSplit.split(" ")[2]}
              </span>
            </span>
          </div>
          <div className="todo--left">
            <img
              src={status ? orangestar : star}
              className="todo--toggle"
              onClick={() => handleToggle(id)}
              alt=""
            />
            <img
              src={reddelete}
              className="todo--delete"
              onClick={() => handleDelete(id)}
              alt=""
            />
          </div>
        </div>
    </div>
    </>
  );
}
