import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/index';
import '../css/Home.css';

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
      <tbody>
        <tr>
          <td className="table-row">{ user.name }</td>
          <td className="table-row">{ user.age }</td>
          <td className="table-row">
            <button onClick={ () => confirmDelete(user.id) } className="button-row">
              Deletar
            </button>
          </td>
          <td className="table-row">
            <button onClick={ () => setIsUserBeingUpdated(!isUserBeingUpdated)} className="button-row">
              Atualizar
            </button>
          </td>
        </tr>
      </tbody>
    );
  }

  function updatingRow() {
    return (
      <tbody>
        <tr>
          <td className="table-row">
            <input 
              type="text"
              className="update-field"
              placeholder="Name..."
              onChange={ (e) => setNewName(e.target.value) }
              value={ newName }
            />
          </td>

          <td className="table-row">
            <input 
              type="text"
              className="update-field"
              placeholder="Age..."
              onChange={ (e) => setNewAge(e.target.value) }
              value={ newAge }
            />
          </td>

          <td className="table-row">
            <button onClick={ () => cancelUpdate() } className="button-row">
              Cancelar
            </button>
          </td>
          <td className="table-row">
            <button onClick={ () => prepareToUpdateUser() } className="button-row">
              Atualizar
            </button>
          </td>
        </tr>
      </tbody>
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
