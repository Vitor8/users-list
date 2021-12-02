import React from 'react';
import { connect } from 'react-redux';
import UserCard from './UserCard';

function UsersTable({ usersArray }) {
  return (
    <div>
      <table>
        <tr>
          <th className="table-title">Nome</th>
          <th className="table-title">Idade</th>
        </tr>
        { usersArray.map((user) => <UserCard user={ user } />) }
      </table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  usersArray: state.usersListReducer.usersArray,
});

export default connect(mapStateToProps)(UsersTable);
