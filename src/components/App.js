import React from "react";
import "./../styles/App.css";
import {useState} from 'react';

function App() 
{   
	let count = 1;
	const [list, setList] = useState([]);
	const [inputVal,setInputVal] = useState("");
	const [ID,setID] = useState(1);
	const [isEditable,setEditable] = useState(NaN);
	function getVal(event) {
		setInputVal(event.target.value);
	};
	function addInArray(e) {
          e.preventDefault();
		  if(inputVal != "") {
		let obj = {task: inputVal, id: ID,completed: false};
		let arr = list.slice();
		
		arr.push(obj);
		setList(arr);
		setInputVal("");
		setID(ID+1);
		  }
		};
	
	return (
	<div id="main">
	 <h1>ToDo List</h1>
	 <div>
		
	 <textarea type="text" placeholder="Add an item" onChange={getVal} id="task" value={inputVal}/>
	 <button id="btn" onClick={addInArray}>Add</button> 
	 </div>
	 <ul>
       {list.map((item) =>                                  
	   <>{ !isNaN(isEditable) && isEditable == item.id ? <><textarea className="editTask" value={inputVal == "" ? item.task : inputVal} 
	   onChange={(event)=> setInputVal(event.target.value)}></textarea>
	 
	   <button className="saveTask" onClick={()=> {
		const arr = list.map((obj)=> {
			if(obj.id == item.id && inputVal != "") {
				obj.task = inputVal;
			}
			return obj;
		}); 
		setEditable(NaN);
	    setInputVal("");
		setList(arr);
	   }}>Save</button>
	   </> :
		<>
		<li className="list" key={item.id}>{item.task}</li>
		<button onClick={()=> {
			const newArray = list.filter((obj)=> {return obj.id !== item.id});
			setList(newArray);
		}} className="delete" >Delete</button>
		<button onClick={()=> {
           setEditable(item.id);
		}} className="edit">Edit</button>
		</>}</>
)       
	   }</ul>
	</div>
	);
}


export default App;
