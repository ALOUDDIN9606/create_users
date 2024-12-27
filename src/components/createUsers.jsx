import React, { useState } from 'react';
import { useUserStore } from '../zustand/createUser';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    age: '',
    gender: '',
  });
  const [isEditing, setIsEditing] = useState(false); 
  const [editIndex, setEditIndex] = useState(null); 
  const { users, addUser, removeUser, updateUser } = useUserStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    const { fname, lname, age, gender } = formData;
    if (fname && lname && age && gender) {
      if (isEditing) {
        updateUser(editIndex, formData)
        setIsEditing(false);
        setEditIndex(null);
      } else {
        addUser(formData);
      }
      setFormData({ fname: '', lname: '', age: '', gender: '' });
    }
  };

  const handleEditUser = (index) => {
    const userToEdit = users[index];
    setFormData(userToEdit); 
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteUser = (index) => {
    removeUser(index);
  };

  return (
    <div className="flex">
      <div className="w-80 h-screen bg-gray-100 p-5 shadow-md">
        <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit User' : 'Create User'}</h3>
        <div className="mb-4">
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            placeholder="First Name"
            className="border p-2 w-full mb-3 rounded"
          />
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="border p-2 w-full mb-3 rounded"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
            className="border p-2 w-full mb-3 rounded"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border p-2 w-full mb-3 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button
          onClick={handleAddUser}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </div>

      <div className="p-5 flex flex-wrap gap-4 flex-1 items-start">
        {users.map((user, index) => (
          <div
            key={index}
            className="w-72 shadow-lg border rounded-md overflow-hidden bg-white p-4"
          >
            <div className="p-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Name: {user.fname} {user.lname}
              </h3>
              <p className="text-gray-600 mb-2">Age: {user.age}</p>
              <p className="text-gray-600 mb-2">Gender: {user.gender}</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                  onClick={() => handleEditUser(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDeleteUser(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateUser;
