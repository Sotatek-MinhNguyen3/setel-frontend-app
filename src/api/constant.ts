export const ApiRequestUrl = {
    BASE: process.env.API_ENDPOINT || 'http://localhost:5000',
    ORDER: 'orders',
    PAYMENT: 'payment'
}

export const MOCK_JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export const ApiErrorStatusCode = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_STATUS_ERROR: 500
}