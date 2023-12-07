import { signOut } from "firebase/auth"
import React, { useEffect, useMemo, useState } from 'react'
import DisplayNote from './DisplayNote'
import Form from './Form'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, where, query } from 'firebase/firestore';
import { db } from '../firebase_config';
import {auth} from '../firebase_config';
import { useNavigate } from "react-router-dom";



const Note = () => {
    const [notes,setNotes]=useState([])
    const [id, setId] = useState("")
    const [addNote, setAddNote] = useState({
        title: "", 
        body: "", 
         createdDate: '',
        color: '',
    })
  const history = useNavigate();

    
    const noteRef =  collection(db, "note")
    const user = auth.currentUser;


// console.log(formattedDate);
const handleClick = () =>{
        signOut(auth).then(val=>{
            console.log(val,"val")
            history('/')
        })}

  useEffect(() => {
    const getNotes = async () => {
    //   const data = await getDocs(noteRef)
    if(user){
        const quer = query(noteRef, where("userId", "==", user.uid));
        const data = await getDocs(quer);
        setNotes(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
    }
    //   console.log(data);
    //   setNotes(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
    }
    getNotes()
  }, [user,noteRef])
  
   

    // const createNote=(note)=>{
        


    //     console.log(note)
    //     setNotes((prevNotes)=>{
    //         return [...prevNotes, note]
    //       })
    // }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(user){
            
            console.log(addNote,"before");
            const currentDate = new Date().toLocaleDateString();
            const updatedNote = {
                ...addNote,
                createdDate: currentDate,
                userId: user.uid,
              };
           
            console.log(updatedNote,"after")
            // const userNotesRef = collection(noteRef, user.uid); 
            await addDoc(noteRef, updatedNote);
            // props.onCreate(updatedNote)
            setAddNote({
             title: "",
             body: "", 
             createdDate: '',
             color: '',})
        }
    }

    const handleChange=async(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setAddNote({ ...addNote, [name]: value })
    }
    const deleteNote = async (id) => {
        console.log(id);
        const deletenote = doc(noteRef, id)
        await deleteDoc(deletenote)
      }
      const updateNote = async (note) => {
        // console.log(note);
        setAddNote({title: note.title, body: note.body,createdDate:note.createdDate})
        setId(note.id)
      }
    // 

      const updatedNote = async (id) =>{
        if(id){

            const updatenote = doc(noteRef, id)
            await updateDoc(updatenote, addNote)
            setAddNote({
                title: "",
                body: "", 
                createdDate: '',
                color: '',})
                setId("")
        }else{
            console.log("no id")
        }
      
      }
    


  return (
    
<div className="container">
<form method='post' onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Enter Title..." onChange={handleChange} value={addNote.title} />
      <textarea name="body" placeholder='Type Content Here...' onChange={handleChange} value={addNote.body} rows="4"></textarea>
      <select name="color" onChange={handleChange} placeholder='select your color' value={addNote.color}>
      <option value="" hidden>Select your color</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
        <option value="orange">Orange</option>
      </select>
      <div style={{ marginTop: '10px', backgroundColor: addNote.color, width: '50px', height: '20px' }}></div>
      <div style={{ "display": "flex" }}>
          <button style={{background:"green"}}  type='submit'>submit</button>
          <button style={{marginLeft: "10px"}} type='button' onClick={()=>updatedNote(id)}>update</button>
          <button style={{background:"red"}} onClick={handleClick}>SignOut</button>
        </div>
    </form>

    <div className='note-container'>
        {   notes && notes.map((noted)=>{
          

              return  <DisplayNote title={noted.title} body={noted.body} id={noted.id} createdDate={noted.createdDate} getId={deleteNote} getUpdateNoteId={updateNote} bgColor={noted.color}/>
            })
        }
      
    </div>
</div>
    
  )
}

export default Note
