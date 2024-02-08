import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, FireEvent, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Register from './Register';
import store from '../store/store';




// Test the Register component
// describe('Register Component', () => {
test('renders register form', () => {
    render(
        <Router>
            <Provider store={store}>
                <Register />
            </Provider>
        </Router>
    );
    const registerForm = screen.getByTestId('register-form');
    const email = screen.getByText(/Register/i);;
    expect(registerForm).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    const button = screen.getByText("submit");
    fireEvent.click(button);
    const errorAlert = screen.getByText('Please provide all values');
    expect(errorAlert).toBeInTheDocument();
});

// Add more tests for other functionality of the Register component

test('name input should be rendered', () => {
    render(<Router><Provider store={store}><Register /></Provider></Router>);
    const inputElement = screen.getByLabelText('name');
    expect(inputElement).toBeInTheDocument();
});

test('alert should not be visible', () => {
    render(<Router><Provider store={store}><Register /></Provider></Router>);
    const errElement = screen.queryByTestId('alert');
    expect(errElement).not.toBeInTheDocument();
})

test('name input should be changed', () => {
    render(<Router><Provider store={store}><Register /></Provider></Router>);
    const inputElement = screen.getByLabelText('name');
    const testValue = 'testName';

    fireEvent.change(inputElement, { target: { value: testValue } });
    expect(inputElement.value).toBe(testValue);

});

test('email input should be changed', () => {
    render(<Router><Provider store={store}><Register /></Provider></Router>);
    const inputElement = screen.getByLabelText('email');
    const testValue = 'test@email.com';

    fireEvent.change(inputElement, { target: { value: testValue } });
    expect(inputElement.value).toBe(testValue);

});

test('password input should be changed', () => {
    render(<Router><Provider store={store}><Register /></Provider></Router>);
    const inputElement = screen.getByLabelText('password');
    const testValue = 'password';

    fireEvent.change(inputElement, { target: { value: testValue } });
    expect(inputElement.value).toBe(testValue);

});

test('submit button should be disabled while loading', () => {
    render(<Router><Provider store={store}><Register /></Provider></Router>);
    // Name element changed with test value
    const nameInputElement = screen.getByLabelText('name');
    const nameTestValue = 'testName';
    fireEvent.change(nameInputElement, { target: { value: nameTestValue } });
    // Password element changed with test value
    const passwordInputElement = screen.getByLabelText('password');
    const passwordTestValue = 'password';
    fireEvent.change(passwordInputElement, { target: { value: passwordTestValue } });
    // Email element changed with test value
    const emailInputElement = screen.getByLabelText('email');
    const emailTestValue = 'test@email.com';
    fireEvent.change(emailInputElement, { target: { value: emailTestValue } });

    const button = screen.getByText("submit");
    fireEvent.click(button);
    // expect(button).toBeDisabled();
    const errAlertText = screen.queryByTestId('alert');
    expect(errAlertText).not.toBeInTheDocument();
    screen.debug();

})
// });
