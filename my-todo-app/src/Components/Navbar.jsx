import myImage from "../Images/Sort-Icon.png";
import filtericon from "../Images/filer1.png";

import sun from "../Images/sun.png";

export default function Navbar(props){
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
            <img className="sun--icon" src={sun} alt="" />
           <h3>My Day ...</h3>
            </div>
           <p>{formattedDate}</p>
        </div>
           <h1 className="nav--title">Insure Pro 2.0 Todo App</h1>
           <div className="sort">
            
            <img className="sort--icon" src={myImage} alt="" />
           <p className="sort--text">Sort</p>
           <img className="filter--icon" src={filtericon} alt="" />
           <p className="filter--text" onClick={props.handleFilter}>Filter</p>
           
           </div>
       </nav>
    )
}