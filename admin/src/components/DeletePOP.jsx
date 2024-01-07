import React from "react";

const DeletePOP = ({
  deleteItemId,
  handleDelete,
  toggleDeleteConfirmation,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-lg font-semibold mb-4">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => handleDelete(deleteItemId)}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            onClick={() => toggleDeleteConfirmation()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePOP;
