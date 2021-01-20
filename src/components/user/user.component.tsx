import React from 'react';

const User: React.FC = () => {
    return (
        <div className="user">
            <p>Welcome to Instalytics, {localStorage.getItem('name')!}</p>
            <p>Your registered email is: {localStorage.getItem('email')}</p>
            <img src={localStorage.getItem('picture') || ''} alt=""/>
        </div>
    );
}

export default User;
