import React, { useEffect, useState } from 'react';
import { getUsers, insertUser, updateUser, deleteUser, getUserById } from '../api';
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
        <div className="user-management-container">
            <h1 className="title">User Management</h1>

            <div className="form-container">
                <h2>Add New User</h2>
                <input 
                    type="text" 
                    placeholder="First Name" 
                    value={newUser.first_name} 
                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })} 
                    className="input-field"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={newUser.email} 
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
                    className="input-field"
                />
                <input 
                    type="text" 
                    placeholder="Phone" 
                    value={newUser.phone} 
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} 
                    className="input-field"
                />
                <button onClick={handleInsert} className="action-button">Add User</button>
            </div>

            <div className="form-container">
                <h2>Get User by ID</h2>
                <input 
                    type="text" 
                    placeholder="Enter User ID" 
                    value={userIdToFetch} 
                    onChange={(e) => setUserIdToFetch(e.target.value)} 
                    className="input-field"
                />
                <button onClick={handleGetUserById} className="action-button">Fetch User</button>

                {selectedUser && (
                    <div className="edit-user-container">
                        <h3>Edit User</h3>
                        <input 
                            type="text" 
                            value={selectedUser.first_name} 
                            onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })} 
                            className="input-field"
                        />
                        <input 
                            type="email" 
                            value={selectedUser.email} 
                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} 
                            className="input-field"
                        />
                        <input 
                            type="text" 
                            value={selectedUser.phone} 
                            onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })} 
                            className="input-field"
                        />
                        <button onClick={handleUpdateUser} className="action-button">Update User</button>
                    </div>
                )}
            </div>

            <div className="user-list-container">
                <h2>Users List</h2>
                {/* Use the UserList component to render the list */}
                <UserList users={users} handleDelete={handleDelete} />
            </div>
        </div>
    );
};

export default UserManagement;