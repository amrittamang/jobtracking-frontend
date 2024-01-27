import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import Register from './Register';
import store from '../store/store';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    rest.post('http://localhost:3000/api/v1/register', (req, res, ctx) => {
        return res(
            ctx.json({
                message: 'User created successfully',
                user: {
                    id: 1,
                    email: 'johndoe.email.com',
                    name: 'John Doe',
                }
            }),
            ctx.status(201)
        );
    }),
);

// Enable request interception using the same request handlers
beforeAll(() => server.listen())


// Reset handlers so that each test could alter them without affecting other,
// unrelated tests.
afterEach(() => server.resetHandlers())


// Don't forget to clean up afterwards.
afterAll(() => server.close())

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
