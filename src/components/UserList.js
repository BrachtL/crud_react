import React from 'react';
import '../styles/UserList.css'; 

const UserList = ({ users, handleDelete }) => {
    return (
        <div className="user-list">
            {users.map(user => (
                <div key={user.id} className="user-card">
                    <div className="user-info">
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Name:</strong> {user.first_name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                    </div>
                    <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default UserList;