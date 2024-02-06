import '@testing-library/jest-dom/extend-expect'
import { TextEncoder } from 'node:util'

global.TextEncoder = TextEncoder




// import { mswServer } from './api-mocks/msw-server'
// beforeAll(() => mswServer.listen());
// afterEach(() => mswServer.restoreHandlers());
// afterAll(() => mswServer.close());


