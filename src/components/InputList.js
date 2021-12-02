import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../actions/index';

function InputList({ addUser }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  function newUser(name, age) {
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

export default connect(null, mapDispatchToProps)(InputList);
