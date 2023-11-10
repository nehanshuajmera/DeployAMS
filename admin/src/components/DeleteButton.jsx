import { useAllData } from "../context/AllDataContext"

const DeleteButton = ({API,itemId}) => {
  const {deleteItem} = useAllData()
  return (
    <div onClick={()=>deleteItem({API,itemId})} className="button1 hover:button2">
      Delete
    </div>
  )
}

export default DeleteButton
