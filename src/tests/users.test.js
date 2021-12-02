import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import Home from '../pages/Home';

import { renderWithRouterAndStore } from './testConfig';

describe('1 - Crie um form para cadastro de usuários, ', () => {

  test('o form deve possuir labels e campos de input para inserir nome e idade do usuário', () => {
    renderWithRouterAndStore(<Home />, '/');
    const nameLabel = screen.getByTestId("name-label");
    const ageLabel = screen.getByTestId("age-label");
    const nameInput = screen.getByTestId("name-input");
    const ageInput = screen.getByTestId("age-input");

    expect(nameLabel).toBeInTheDocument();
    expect(ageLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
  });

  test('o form deve possuir um botão com o texto "Salvar" para cadastrar os dados do usuário', () => {
    renderWithRouterAndStore(<Home />, '/');

    const button = screen.getByText(/Salvar/i);
    expect(button).toBeInTheDocument();
  });

  test('dados do usuário devem estar visíveis após cadastro ', () => {
    renderWithRouterAndStore(<Home />, '/');

    const nameInput = screen.getByTestId("name-input");
    const ageInput = screen.getByTestId("age-input");
    const button = screen.getByText(/Salvar/i);

    userEvent.type(nameInput, 'Vitor');
    userEvent.type(ageInput, '23');
    fireEvent.click(button);

    const savedName = screen.getByText(/Vitor/i);
    const savedAge = screen.getByText(/23/i);

    expect(savedName).toBeInTheDocument();
    expect(savedAge).toBeInTheDocument();
  });

});