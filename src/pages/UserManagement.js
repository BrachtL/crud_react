// /src/pages/UserManagement.js

import React, { useEffect, useState } from 'react';
import { getUsers, insertUser, updateUser, deleteUser, getUserById } from '../api';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import '../styles/UserManagement.css';

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
        fetchUsers();
        setNewUser({ first_name: '', email: '', phone: '' });
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    const handleGetUserById = async () => {
        const res = await getUserById(userIdToFetch);
        setSelectedUser(res.user);
    };

    const handleUpdateUser = async () => {
        if (selectedUser) {
            await updateUser(selectedUser);
            fetchUsers();
            setSelectedUser(null);
        }
    };

    return (
        <div>
            <h1>User Management</h1>

            <UserForm 
                user={newUser} 
                setUser={setNewUser} 
                handleSubmit={handleInsert} 
            />

            <h2>Get User by ID</h2>
            <input 
                type="text" 
                placeholder="Enter User ID" 
                value={userIdToFetch} 
                onChange={(e) => setUserIdToFetch(e.target.value)} 
            />
            <button onClick={handleGetUserById}>Fetch User</button>

            {selectedUser && (
                <div>
                    <h3>Edit User</h3>
                    <UserForm 
                        user={selectedUser} 
                        setUser={setSelectedUser} 
                        handleSubmit={handleUpdateUser} 
                    />
                </div>
            )}

            <h2>Users List</h2>
            <UserList users={users} handleDelete={handleDelete} />
        </div>
    );
};

export default UserManagement;