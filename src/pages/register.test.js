import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Register from './Register';
import store from '../store/store';




// Test the Register component
describe('Register Component', () => {
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
    });

    // Add more tests for other functionality of the Register component
});
