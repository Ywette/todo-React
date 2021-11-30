import React, { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
  const [taskList, setTaskList]=useState();
  
  const addTaskToList =(e: )=>{
    console.log(e)

  }


  return (
    <div>
      <input type="text" onClick={(e) => setTaskList(e.target.value)}/>
    </div>
  );
};

export default App;
