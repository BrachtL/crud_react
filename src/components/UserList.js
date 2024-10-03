// /src/components/UserList.js

import React from 'react';

const UserList = ({ users, handleDelete }) => {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    ID: {user.id} - {user.first_name} - {user.email} - {user.phone}
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default UserList;