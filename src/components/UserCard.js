import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/index';

function UserCard({ user, removeUser, updateUser }) {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [isUserBeingUpdated, setIsUserBeingUpdated] = useState(false);
  
  function confirmDelete(userId) {
    const confirm = window.confirm('Deseja apagar esta linha ?');
    if (confirm) removeUser(userId);
    return null;
  }

  function cancelUpdate() {
    setIsUserBeingUpdated(!isUserBeingUpdated);
    setNewName('');
    setNewAge('');
  }

  function prepareToUpdateUser() {
    const userId = user.id;
    updateUser({ userId, newName, newAge });
    setIsUserBeingUpdated(!isUserBeingUpdated);
    setNewName('');
    setNewAge('');
  }

  function normalRow() {
    return (
      <tr>
        <td className="table-row">{ user.name }</td>
        <td className="table-row">{ user.age }</td>
        <td><button onClick={ () => confirmDelete(user.id) }>D</button></td>
        <td><button onClick={ () => setIsUserBeingUpdated(!isUserBeingUpdated)}>U</button></td>
      </tr>
    );
  }

  function updatingRow() {
    return (
      <tr>

        <td className="input-name-div">
          <input 
            type="text"
            className="input-name-text"
            placeholder="New Name..."
            onChange={ (e) => setNewName(e.target.value) }
            value={ newName }
          />
        </td>

        <td className="input-age-div">
          <input 
            type="text"
            className="input-age-text"
            placeholder="New Age..."
            onChange={ (e) => setNewAge(e.target.value) }
            value={ newAge }
          />
        </td>

        <td><button onClick={ () => prepareToUpdateUser() }>U</button></td>
        <td><button onClick={ () => cancelUpdate() }>C</button></td>
      </tr>
    );
  }

  return (
    isUserBeingUpdated ? updatingRow() : normalRow()
  );
}

const mapDispatchToProps = (dispatch) => ({
  removeUser: (userId) => dispatch(userActions.removeUser(userId)),
  updateUser: ({ userId, newName, newAge }) => dispatch(userActions.updateUser({ userId, newName, newAge })),
});

export default connect(null, mapDispatchToProps)(UserCard);
