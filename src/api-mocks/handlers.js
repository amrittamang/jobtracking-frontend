import { rest, http, HttpResponse } from 'msw';
import { baseUrl } from '../api/http-client';

const mockUser = {
    message: 'User created successfully',
    user: {
        id: 1,
        email: 'johndoe.email.com',
        name: 'John Doe',
    }
};

const getRegisterPath = `${baseUrl}/auth/register`;

const registerHandler = http.post(getRegisterPath, async (req, res, ctx) =>
    res(
        ctx.json(mockUser),
        ctx.status(201)
    )
);

export const registerHandlerException = http.post(
    getRegisterPath,
    async (req, res, ctx) =>
        res(
            ctx.status(500),
            ctx.json({ message: 'Deliberately broken request for register user' })
        )
);

export const handlers = [registerHandler];

