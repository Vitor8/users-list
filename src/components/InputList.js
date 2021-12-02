import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/index';

import '../css/Home.css';

function InputList({ addUser, usersArray }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  function isNameAlreadyRegistered(name) {
    const isNameRepeated = usersArray.some((user) => user.name === name);
    return isNameRepeated;
  }

  function newUser(name, age) {
    const isNameRepeated = isNameAlreadyRegistered(name);
    if (isNameRepeated) {
      setName('');
      setAge(''); 
      return alert('Nome já registrado');
    }

    addUser(name, age);
    setName('');
    setAge('');
  }

  return (
    <div className="input-container">

      <div className="input-card">
        <label data-testid="name-label">Nome</label>
        <input 
          type="text"
          className="input-text"
          data-testid="name-input"
          onChange={ (e) => setName(e.target.value) }
          value={ name }
        />
      </div>

      <div className="input-card">
        <label data-testid="age-label">Idade</label>
        <input
          type="text"
          className="input-text"
          data-testid="age-input"
          onChange={ (e) => setAge(e.target.value) }
          value={ age }
        />
      </div>

      <button
        className="save-button"
        type="submit"
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
