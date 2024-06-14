const url = "http://localhost:4000/";

// for users 

export const singUp = async (data) => {
    try {
        return fetch(`${url}user/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then((res) => res.json())
    } catch (error) {
        return null;
    }
}

export const login = async (userName, password) => {
    try {
        return fetch(`${url}user/login/${userName}/${password}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' }).then((res) => res.json());
    } catch (error) {
        return null;
    }
}

export const userdatafetch = async (userName, password) => {
    try {
        return fetch(`${url}user/userdata`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' }).then((res) => res.json());
    } catch (error) {
        return null;
    }
}

export const logOut = async (userName, password) => {
    try {
        return fetch(`${url}user/logout`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' }).then((res) => res.json());
    } catch (error) {
        return null;
    }
}

export const getAll = async () => {
    try {
        return fetch(`${url}user/getAll`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' }).then((res) => res.json());
    } catch (error) {
        return null;
    }
}

//message api

export const sendMsg = async (id, data) => {
    try {
        const newData = {
            message:data,
        };
        return fetch(`${url}user/message/send/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newData), credentials: 'include' }).then((res) => res.json());
    } catch (error) {
        return null;
    }
}

export const reciveMsg = async (id) => {
    try {
        return fetch(`${url}user/message/recive/${id}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' }).then((res) => res.json());
    } catch (error) {
        return null;
    }
}

export const userChatsList = async () => {
    try {
        return fetch(`${url}user/message/reciveall`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' }).then((res) => res.json());
    } catch (error) {
        return null;
    }
}