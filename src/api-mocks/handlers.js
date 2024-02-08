import { http, HttpResponse } from 'msw';
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

const registerHandler = http.post(getRegisterPath, async () =>
    HttpResponse.json(mockUser),
    HttpResponse.status(201)
);

export const registerHandlerException = http.post(
    getRegisterPath,
    async () =>
        HttpResponse.status(500),
    HttpResponse.json({ message: 'Deliberately broken request for register user' })
);

export const handlers = [registerHandler];

