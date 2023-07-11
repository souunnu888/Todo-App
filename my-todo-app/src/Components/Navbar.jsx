import myImage from "../Images/Sort-Icon.png";
import filtericon from "../Images/filer1.png";
import morning from "../Images/morSun.png";
import afternoon from "../Images/afterSun.png";
import evening from "../Images/eveSun.png";

import sun from "../Images/sun.png";

export default function Navbar(props){
  // console.log(props);
  const {filtered , handleFilter, handleSortingFunc} = props;

  let Icon = null;

  const todayDate = new Date().toLocaleString();

  let time = todayDate.split(",")[1];
 
  let time2 = time.split(" ")[1].split(":")[0];
  let time3 = time.split(" ")[2];

  if(+time2 >= 5 && time3 === "am"){
    console.log("morning")
    Icon = morning;
  } else if(+time2 >= 12 || +time2 < 4 && time3==="pm"){
    console.log("Afternoon")
    Icon = afternoon;
  } else if(+time2 >= 4 || +time2 <= 9 && time3==="pm") {
    console.log("evening")
    Icon = evening;
  }else{
    console.log("night")
  }

    const currentDate = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formattedDate = currentDate.toLocaleString("en-US",options);
    return (
       <nav className="navbar">
        <div>
            <div className="greet">
            <img className="sun--icon" src={Icon} alt="" />
           <h3>My Day ...</h3>
            </div>
           <p>{formattedDate}</p>
        </div>
           <h1 className="nav--title">Insure Pro 2.0 Todo App</h1>
           <div className="sort">
            
             <img className="sort--icon" src={myImage} alt="" />
           <p className="sort--text" onClick={handleSortingFunc}>Sort</p>
           <button className="favorite--button" onClick={handleFilter}>{filtered ? "All Tasks" : "Favorites"}</button>
           </div>
       </nav>
    )
}