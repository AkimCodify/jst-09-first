import React from "react";
import { useState } from "react";


const AddTodo  = (props) => {
    const [value, setValue] = useState('')
    const {addTodo} = props
    const handleAdd = () => {
        const newTodo = {
            id: Date.now(),
            task: value,
            completed: false
        }
        addTodo(newTodo)
        setValue('')
    }
    

    return(
        <div>
            <h1>Add Todo</h1>
            <input type="text" value={value} onChange={(e) => {setValue(e.target.value)}}/>
            <button onClick={(e) => {
                
                handleAdd()
            }}>Add</button>
        </div>
    )
}

export default AddTodo