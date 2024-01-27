import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    http.post('http://localhost:3000/api/v1/register', (req, res, ctx) => {
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

export default server;