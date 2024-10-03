import React from 'react';

const UserForm = ({ user, setUser, handleSubmit }) => {
    return (
        <div>
            <input 
                type="text" 
                placeholder="First Name" 
                value={user.first_name} 
                onChange={(e) => setUser({ ...user, first_name: e.target.value })} 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={user.email} 
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
            />
            <input 
                type="text" 
                placeholder="Phone" 
                value={user.phone} 
                onChange={(e) => setUser({ ...user, phone: e.target.value })} 
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default UserForm;