import { obtenerUsuarios } from '../api/usuarioAPI';

const STORAGE_KEY = 'floreria_current_user';

export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Error leyendo usuario de localStorage', e);
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    // Notificar a la aplicación sobre cambio de usuario
    try { window.dispatchEvent(new Event('user-changed')); } catch (e) {}
  } catch (e) {
    console.error('Error guardando usuario en localStorage', e);
  }
};

export const clearCurrentUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    try { window.dispatchEvent(new Event('user-changed')); } catch (e) {}
  } catch (e) {
    console.error('Error removiendo usuario de localStorage', e);
  }
};

// Login simple: consulta usuarios y compara username + password en el frontend
export const login = async (username, password) => {
  try {
    const usuarios = await obtenerUsuarios();
    if (!Array.isArray(usuarios) || usuarios.length === 0) {
      console.warn('login: no se obtuvieron usuarios desde la API (o la lista está vacía).', usuarios);
    }
    const user = usuarios.find(u => u.username === username && String(u.password) === String(password));
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  } catch (e) {
    console.error('Error en login', e);
    return null;
  }
};

export const logout = () => {
  clearCurrentUser();
};

export const isLoggedIn = () => !!getCurrentUser();
