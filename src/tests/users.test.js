import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import Home from '../pages/Home';

import { renderWithRouterAndStore } from './testConfig';

describe('Requisito 1:', () => {

  test('O form deve possuir labels e campos de input para inserir nome e idade do usuário', () => {
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

  test('O form deve possuir um botão com o texto "Salvar" para cadastrar os dados do usuário', () => {
    renderWithRouterAndStore(<Home />, '/');

    const button = screen.getByText(/Salvar/i);
    expect(button).toBeInTheDocument();
  });

  test('Dados do usuário devem estar visíveis após cadastro ', () => {
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

describe('Requisito 2:', () => {

  test('Não deve ser permitido o cadastro de pessoas com mesmo nome', () => {
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

describe('Requisito 3:', () => {

  test('Ordene a lista de usuários de forma decrescente pela idade', () => {
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

describe('Requisitos 4 e 5:', () => {

  test('Crie um botão para deletar o usuário desejado', () => {
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

describe('Requisito 6:', () => {

  test('Crie um botão que permite a edição do usuário desejado', () => {
    renderWithRouterAndStore(<Home />, '/');
    const nameInput = screen.getByTestId("name-input");
    const ageInput = screen.getByTestId("age-input");
    const button = screen.getByText(/Salvar/i);

    userEvent.type(nameInput, 'Jorge Luis Borges');
    userEvent.type(ageInput, '100');
    fireEvent.click(button);

    const updateButton = screen.getAllByText(/Atualizar/i);
    const lastUpdateButtonIndex = updateButton.length - 1;
    fireEvent.click(updateButton[lastUpdateButtonIndex]);

    const nameInputUpdating = screen.getByTestId("update-name-input");
    const ageInputUpdating = screen.getByTestId("update-age-input");
    const updatingButton = screen.getByTestId("update-button");

    userEvent.type(nameInputUpdating, 'Diego Maradona');
    userEvent.type(ageInputUpdating, '60');
    fireEvent.click(updatingButton);

    const updatedName = screen.getByText(/Diego Maradona/i);
    const updatedAge = screen.getByText(/60/i);

    expect(updatedName).toBeInTheDocument();
    expect(updatedAge).toBeInTheDocument();
  });

  test('Crie um botão para cancelar a atualização', () => {
    renderWithRouterAndStore(<Home />, '/');
    const nameInput = screen.getByTestId("name-input");
    const ageInput = screen.getByTestId("age-input");
    const button = screen.getByText(/Salvar/i);

    userEvent.type(nameInput, 'Gabriel Garcia Márquez');
    userEvent.type(ageInput, '90');
    fireEvent.click(button);

    const updateButton = screen.getAllByText(/Atualizar/i);
    const lastUpdateButtonIndex = updateButton.length - 1;
    fireEvent.click(updateButton[lastUpdateButtonIndex]);

    const cancelButton = screen.getByText(/Cancelar/i);
    fireEvent.click(cancelButton);

    const currentName = screen.getByText(/Gabriel Garcia Márquez/i);
    const currentAge = screen.getByText(/90/i);

    expect(currentName).toBeInTheDocument();
    expect(currentAge).toBeInTheDocument();
  });

});

describe('Requisito 7:', () => {
  test('Ao clicar no cabeçalho da tabela na palavra Idade, ordene de forma decrescente depois crescente', () => {
    renderWithRouterAndStore(<Home />, '/');
    const nameInput = screen.getByTestId("name-input");
    const ageInput = screen.getByTestId("age-input");
    const button = screen.getByText(/Salvar/i);

    userEvent.type(nameInput, 'Tutancâmon');
    userEvent.type(ageInput, '2000');
    fireEvent.click(button);

    userEvent.type(nameInput, 'Baby Boomer');
    userEvent.type(ageInput, '1');
    fireEvent.click(button);

    let nameFields;
    nameFields = screen.getAllByTestId("name-field");
    const len = nameFields.length - 1;

    expect(nameFields[0]).toHaveTextContent('Tutancâmon');
    expect(nameFields[len]).toHaveTextContent('Baby Boomer');

    const ageTitle = screen.getByTestId("age-title");
    fireEvent.click(ageTitle);

    nameFields = screen.getAllByTestId("name-field");
    expect(nameFields[0]).toHaveTextContent('Baby Boomer');
    expect(nameFields[len]).toHaveTextContent('Tutancâmon');
  });
});


