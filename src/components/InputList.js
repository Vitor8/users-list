import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/index';

function InputList({ addUser, usersArray }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  function isNameAlreadyRegistered(name) {
    const isNameRepeated = usersArray.some((user) => user.name === name);
    return isNameRepeated;
  }

  function newUser(name, age) {
    const isNameRepeated = isNameAlreadyRegistered(name);
    if (isNameRepeated) return alert('Nome já regeistrado');

    addUser(name, age);
    setName('');
    setAge('');
  }

  return (
    <div>
      <div className="input-name-div">
        <label>Nome</label>
        <input 
          type="text"
          className="input-name-text"
          onChange={ (e) => setName(e.target.value) }
          value={ name }
        />
      </div>

      <div className="input-age-div">
        <label>Idade</label>
        <input
          type="text"
          className="input-age-text"
          onChange={ (e) => setAge(e.target.value) }
          value={ age }
        />
      </div>

      <button
        className="add-button"
        onClick={ () => newUser(name, age) }
      >
        Salvar
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (name, age) => dispatch(userActions.addUser(name, age)),
});

const mapStateToProps = (state) => ({
  usersArray: state.usersListReducer.usersArray,
});

export default connect(mapStateToProps, mapDispatchToProps)(InputList);
