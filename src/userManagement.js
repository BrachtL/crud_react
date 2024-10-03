import React, { useEffect, useState } from 'react';
import { getUsers, insertUser, updateUser, deleteUser, getUserById } from './api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ first_name: '', email: '', phone: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data.users); 
    };

    const handleInsert = async () => {
      console.log(newUser);
        await insertUser(newUser);
        fetchUsers(); // Refresh user list
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers(); // Refresh user list
    };

    return (
        <div>
            <h1>User Management</h1>
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