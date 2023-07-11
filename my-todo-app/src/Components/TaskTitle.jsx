import { useState } from "react";
import darrow from "../Images/downarrow.png";
import sarrow from "../Images/sidearrow.png";

export default function TaskTitle(props){
    

    return (
        <div className="task">
           <div className="task--title" >
               <img className="task--downarrow" src={props.arrow? darrow : sarrow} onClick={props.handleTaskArrow} alt="" />
               <h4 className="task--heading" onClick={props.showAllTasks}>{props.title}</h4>
           </div>
           <hr className="custom--hr1"/>
       </div>
    )
}