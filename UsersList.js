import React from 'react';
import './UserList.css';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';
const UsersList = props => {
    if(props.items.length===0){
        return(
        <div>
            <h2>No users found</h2>
        </div>
        );
    }
    return <ul className="users-list">
        {props.items.map(user => {
            return <UserItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places} />
        })}
    </ul>
};

export default UsersList;