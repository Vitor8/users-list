import React from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/index';

function UserCard({ user, removeUser }) {
  
  function confirmDelete(userId) {
    const confirm = window.confirm('Deseja apagar esta linha ?');
    if (confirm) removeUser(userId);
    return null;
  }

  return (
    <tr>
        <td className="table-row">{ user.name }</td>
        <td className="table-row">{ user.age }</td>
        <button onClick={ () => confirmDelete(user.id) }>D</button>
    </tr>
  );
}

const mapDispatchToProps = (dispatch) => ({
  removeUser: (userId) => dispatch(userActions.removeUser(userId)),
});

export default connect(null, mapDispatchToProps)(UserCard);
