import CryptoJS from "crypto-js";
import { create } from "zustand";

const secretKey = "mysecretkey";

export const useStore = create((set) => ({
  products: [],
  setProducts: (products) => set(() => ({ products })),
  realtime: false,
  setRealtime: (realtime) => set(() => ({ realtime })),
  user: getStoredUser(),
  session: getStoredSession(),
  setUser: (user) => {
    // Cifrar los datos de usuario con la clave secreta
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(user),
      secretKey
    ).toString();

    // Almacenar los datos cifrados en la cookie y el localStorage
    setStoredUser(ciphertext);

    // Actualizar el estado con los datos de usuario descifrados
    set(() => ({ user }));
  },
  setSession: (session) => {
    // Cifrar los datos de sesión con la clave secreta
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(session),
      secretKey
    ).toString();

    // Almacenar los datos cifrados en la cookie y el localStorage
    setStoredSession(ciphertext);

    // Actualizar el estado con los datos de sesión descifrados
    set(() => ({ session }));
  },
}));

// Función auxiliar para obtener el objeto de sesión almacenado en la cookie
function getStoredSession() {
  const ciphertext = getCookieValue("session");
  if (ciphertext) {
    // Descifrar los datos de sesión con la clave secreta
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const sessionStr = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(sessionStr);
  }
  return null;
}

// Función auxiliar para obtener el objeto de usuario almacenado en la cookie
function getStoredUser() {
  const ciphertext = getCookieValue("user");
  if (ciphertext) {
    // Descifrar los datos de usuario con la clave secreta
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const userStr = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(userStr);
  }
  return null;
}

// Función auxiliar para almacenar el objeto de sesión cifrado en la cookie y el localStorage
function setStoredSession(ciphertext) {
  setCookieValue("session", ciphertext, 2); // Almacenar durante 2 días
  localStorage.setItem("session", ciphertext);
}

// Función auxiliar para almacenar el objeto de usuario cifrado en la cookie y el localStorage
function setStoredUser(ciphertext) {
  setCookieValue("user", ciphertext, 2); // Almacenar durante 2 días
  localStorage.setItem("user", ciphertext);
}

// Función auxiliar para obtener el valor de una cookie por nombre
function getCookieValue(name) {
  const match =
    typeof document !== "undefined" &&
    document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  if (match) {
    return match[2];
  }
  return null;
}

// Función auxiliar para establecer el valor de una cookie
function setCookieValue(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}
