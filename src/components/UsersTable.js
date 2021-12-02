import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/index';
import UserCard from './UserCard';
import '../css/Home.css'

function UsersTable({ usersArray, checkSessionStorage }) {
  const [usersArrayOrderByAge, setOrder] = useState([]);
  const [controlOrder, setControlOrder] = useState('dec');
  const [hasCheckedSessionStorage, setHasCheckedSessionStorage] = useState(false);

  useEffect(() => {
    let savedUsers = [];
    const savedData = JSON.parse(sessionStorage.getItem('usersArray')) || [];
    if (savedData.length !== 0) savedUsers = savedData.usersArray;
    checkSessionStorage(savedUsers);
    setHasCheckedSessionStorage(true);
  },[]);

  useEffect(() => {
    if (controlOrder === 'asc') orderByAgeAsc();
    if (controlOrder === 'dec') orderByAgeDec();
  },[usersArray]);

  function handleOrder() {
    if (controlOrder === 'dec') {
      orderByAgeAsc();
      setControlOrder('asc');
    } 
    
    if (controlOrder === 'asc') {
      orderByAgeDec();
      setControlOrder('dec');
    }
  }

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
    setOrder(usersArrayDec);
  }

  function orderByAgeAsc() {
    let usersArrayAsc = usersArray;
    for (let i = 0; i < usersArrayAsc.length; i++) {
      for (let j = 0; j < (usersArrayAsc.length - i - 1); j++) {
        if (parseInt(usersArrayAsc[j].age,10) > parseInt(usersArrayAsc[j + 1].age,10)) {
          let help = usersArrayAsc[j];
          usersArrayAsc[j] = usersArrayAsc[j + 1];
          usersArrayAsc[j + 1] = help;
        }
      }
    }
    setOrder(usersArrayAsc);
  }

  return (
    <div>
      <table className="table-container">
        <tr>
          <th className="table-title">Nome</th>
          <th className="table-title" onClick={ () => handleOrder() }>Idade</th>
          <th className="table-title">-</th>
          <th className="table-title">-</th>
        </tr>
        {
          hasCheckedSessionStorage && usersArrayOrderByAge.map((user) => <UserCard key={user.id} user={user} />)
        }
      </table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  usersArray: state.usersListReducer.usersArray,
});

const mapDispatchToProps = (dispatch) => ({
  checkSessionStorage: (usersArray) => dispatch(userActions.checkSessionStorage(usersArray)),
});

export default connect(mapStateToProps,mapDispatchToProps)(UsersTable);
