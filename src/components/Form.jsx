import { before } from 'lodash'
import React, { useState } from 'react'

const Form = (props) => {
    const [note, setNote] = useState({
        title: "", 
        body: "", 
         createdDate: '',
        color: '',
    })
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(note,"before");
        const currentDate = new Date().toLocaleDateString();
        const updatedNote = {
            ...note,
            createdDate: currentDate,
          };
       
        console.log(updatedNote,"after")
        props.onCreate(updatedNote)
        setNote({
         title: "",
         body: "", 
         createdDate: '',
         color: '',})
    }

    const handleChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setNote({...note, [name]: value})
    }
  return (
    <form method='post' onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Enter Title..." onChange={handleChange} value={note.title} />
      <textarea name="body" placeholder='Type Content Here...' onChange={handleChange} value={note.body} rows="4"></textarea>
      <select name="color" onChange={handleChange} placeholder='select your color' value={note.color}>
      <option value="" hidden>Select your color</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
        <option value="orange">Orange</option>
      </select>
      <div style={{ marginTop: '10px', backgroundColor: note.color, width: '50px', height: '20px' }}></div>
      <button type='submit'>submit</button>
    </form>
  )
}

export default Form
