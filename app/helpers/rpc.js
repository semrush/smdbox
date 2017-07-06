import uuid from 'uuid';

export const createRequest = ({ method, params = {} }) => ({
    id: uuid.v4(),
    jsonrpc: '2.0',
    method,
    params
});
