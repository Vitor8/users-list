import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
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

describe('2 - No formulário criado no item 1', () => {

  test('não é permitido o cadastro de pessoas com mesmo nome', () => {
    renderWithRouterAndStore(<Home />, '/');

    /* Para manipulação correta de window alert junto com o teste em Jest, consultei a seguinte thread: 
      https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert
    */
    const jsdomAlert = window.alert;
    window.alert = () => {}; 

    const nameInput = screen.getByTestId("name-input");
    const ageInput = screen.getByTestId("age-input");
    const button = screen.getByText(/Salvar/i);

    userEvent.type(nameInput, 'Vitor');
    userEvent.type(ageInput, '23');
    fireEvent.click(button);

    userEvent.type(nameInput, 'Vitor');
    userEvent.type(ageInput, '32');
    fireEvent.click(button);

    const savedName = screen.getAllByText(/Vitor/i);

    expect(savedName).toHaveLength(1);
    window.alert = jsdomAlert;  // restore the jsdom alert
  });

});

describe('3 - Para aperfeiçoar o requisito 1', () => {

  test('ordene a lista de usuários de forma decrescente pela idade', () => {
    renderWithRouterAndStore(<Home />, '/');

    const nameInput = screen.getByTestId("name-input");
    const ageInput = screen.getByTestId("age-input");
    const button = screen.getByText(/Salvar/i);

    userEvent.type(nameInput, 'Júlio César');
    userEvent.type(ageInput, '30');
    fireEvent.click(button);

    userEvent.type(nameInput, 'João Goulart');
    userEvent.type(ageInput, '55');
    fireEvent.click(button);

    const tableColumns = screen.getAllByRole('cell');

    expect(tableColumns[0]).toHaveTextContent('João Goulart');
    expect(tableColumns[4]).toHaveTextContent('Júlio César');
  });

});

describe('4 e 5 - Para aperfeiçoar o requisito 1, ', () => {

  test('crie um botão para deletar o usuário desejado', () => {
    const confirmSpy = jest.spyOn(window,'confirm').mockImplementation(); 
    renderWithRouterAndStore(<Home />, '/');

    const nameInput = screen.getByTestId("name-input");
    const ageInput = screen.getByTestId("age-input");
    const button = screen.getByText(/Salvar/i);

    userEvent.type(nameInput, 'Napoleão Bonaparte');
    userEvent.type(ageInput, '200');
    fireEvent.click(button);

    const savedName = screen.getByText(/Napoleão Bonaparte/i);
    const savedAge = screen.getByText(/200/i);

    expect(savedName).toBeInTheDocument();
    expect(savedAge).toBeInTheDocument();

    const buttonToDelete = screen.getAllByText(/Deletar/i);
    const lastButtonIndex = buttonToDelete.length - 1;

    fireEvent.click(buttonToDelete[lastButtonIndex]);

    expect(confirmSpy).toHaveBeenCalledTimes(1);
  });

});


