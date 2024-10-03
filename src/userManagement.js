import React, { useEffect, useState } from 'react';
import { getUsers, insertUser, updateUser, deleteUser, getUserById } from './api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ first_name: '', email: '', phone: '' });
    const [selectedUser, setSelectedUser] = useState(null);
    const [userIdToFetch, setUserIdToFetch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data.users); 
    };

    const handleInsert = async () => {
        await insertUser(newUser);
        fetchUsers(); // Refresh user list
        setNewUser({ first_name: '', email: '', phone: '' }); // Clear input fields
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers(); // Refresh user list
    };  

    const handleGetUserById = async () => {
        const res = await getUserById(userIdToFetch);
        setSelectedUser(res.user);
    };

    const handleUpdateUser = async () => {
        if (selectedUser) {
          console.log("selectedUser: ", selectedUser);
            await updateUser(selectedUser);
            fetchUsers(); // Refresh user list
            setSelectedUser(null); // Clear selected user after updating
        }
    };

    return (
        <div>
            <h1>User Management</h1>

            {/* Form to insert a new user */}
            <input 
                type="text" 
                placeholder="First Name" 
                value={newUser.first_name} 
                onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })} 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={newUser.email} 
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
            />
            <input 
                type="text" 
                placeholder="Phone" 
                value={newUser.phone} 
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} 
            />
            <button onClick={handleInsert}>Add User</button>

            {/* Form to fetch user by ID */}
            <h2>Get User by ID</h2>
            <input 
                type="text" 
                placeholder="Enter User ID" 
                value={userIdToFetch} 
                onChange={(e) => setUserIdToFetch(e.target.value)} 
            />
            <button onClick={handleGetUserById}>Fetch User</button>

            {/* Display fetched user */}
            {selectedUser && (
                <div>
                    <h3>Edit User</h3>
                    <input 
                        type="text" 
                        value={selectedUser.first_name} 
                        onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })} 
                    />
                    <input 
                        type="email" 
                        value={selectedUser.email} 
                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} 
                    />
                    <input 
                        type="text" 
                        value={selectedUser.phone} 
                        onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })} 
                    />
                    <button onClick={handleUpdateUser}>Update User</button>
                </div>
            )}

            {/* List of users */}
            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        ID: {user.id} - {user.first_name} - {user.email} - {user.phone}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
