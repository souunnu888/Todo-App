import { useState } from "react";
import darrow from "../Images/downarrow.png";
import sarrow from "../Images/sidearrow.png";


export default function CompletedTasksTitle(props){
    return (
        <div className="task">
           <div className="completed--task--title" >
               <img className="completed--task--downarrow" src={props.arrow? darrow : sarrow} onClick={props.handleCompletedTaskArrow} alt="" />
               <h4 className="task--heading">{props.title}</h4>
           </div>
           <hr className="custom--hr"/>
       </div>
    )
}