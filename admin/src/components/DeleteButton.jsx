import { useDispatch } from "react-redux";
import { deleteStudentAsync } from "../redux-toolkit/slices/crudstudentslice";

const DeleteButton = ({ itemId }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await dispatch(deleteStudentAsync(itemId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div onClick={() => handleDelete()} className="button1 hover:button2">
      Delete
    </div>
  );
};

export default DeleteButton;
