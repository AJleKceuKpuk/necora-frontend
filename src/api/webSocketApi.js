export const getWebSocketUrl = (token) => {
    const base = 'https://localhost:8443/ws';
    return `${base}?token=${token}`;
};