import React from 'react'

const DisplayNote = (props) => {

    const handleClick = (id) =>{
        props.getId(id)
      }

      const handleUpdate = (note) =>{
        props.getUpdateNoteId(note)
      }
  return (
    <div className="note"  style={{ background:props.bgColor }} >

    <p className='title'>{props.title}</p>
    <p className='content'>{props.body} </p>
    <p className=''>{props.createdDate}</p>
    <button onClick={()=>handleClick(props.id)}>delete</button>
    <button style={{"marginLeft": "10px"}} onClick={()=>handleUpdate({ title: props.title,body: props.body,createdDate:props.createdDate, id: props.id})}>update</button>
      </div>
  )
}

export default DisplayNote
