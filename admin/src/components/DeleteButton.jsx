

const DeleteButton = ({API,itemId}) => {
 
  return (
    <div onClick={()=>deleteItem({API,itemId})} className="button1 hover:button2">
      Delete
    </div>
  )
}

export default DeleteButton
