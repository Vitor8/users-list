import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import UserCard from './UserCard';

function UsersTable({ usersArray }) {
  const [usersArrayOrderByAgeDec, setOrderDec] = useState([]);

  useEffect(() => {
    orderByAgeDec();
  },[usersArray]);

  function orderByAgeDec() {
    let usersArrayDec = usersArray;
    for (let i = 0; i < usersArrayDec.length; i++) {
      for (let j = 0; j < (usersArrayDec.length - i - 1); j++) {
        if (parseInt(usersArrayDec[j].age,10) < parseInt(usersArrayDec[j + 1].age,10)) {
          let help = usersArrayDec[j];
          usersArrayDec[j] = usersArrayDec[j + 1];
          usersArrayDec[j + 1] = help;
        }
      }
    }
    setOrderDec(usersArrayDec);
  }

  return (
    <div>
      <table>
        <tr>
          <th className="table-title">Nome</th>
          <th className="table-title">Idade</th>
          <th className="table-title">-</th>
          <th className="table-title">-</th>
        </tr>
        { usersArrayOrderByAgeDec.map((user) => <UserCard key={user.id} user={user} />) }
      </table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  usersArray: state.usersListReducer.usersArray,
});

export default connect(mapStateToProps)(UsersTable);
