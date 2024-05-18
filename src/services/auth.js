import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";
// sign up
export async function signUp({
  firstname,
  lastname,
  email,
  password,
  confirmpassword,
  age,
  gender,
  phonenumber,
}) {
  const response = await fetch(`${BASE_URL}/Auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      age,
      gender,
      phonenumber,
    }),
  });

  return response.json();
}
// sign in
export async function signIn({ email, password }) {
  const response = await fetch(`${BASE_URL}/Auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response.json();
}
// sign out
export async function logOut() {
  const response = await fetch(`${BASE_URL}/Auth/logOut`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
// forgetCode
export async function forgetCode({ email }) {
  const response = await fetch(`${BASE_URL}/Auth//forgetCode`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return response.json();
}
// checkCode
export async function checkCode({ forgetCode, email }) {
  const response = await fetch(
    `${BASE_URL}/Auth//checkCode/?` +
      new URLSearchParams({
        email: email,
      }),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ forgetCode }),
    }
  );

  return response.json();
}
// reset passwprd
export async function resetPassword({ email, password, confirmpassword }) {
  const response = await fetch(
    `${BASE_URL}/Auth//resetPassword/?` +
      new URLSearchParams({
        email: email,
      }),
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, confirmpassword }),
    }
  );

  return response.json();
}

// sign out
export async function deleteAccount() {
  const response = await fetch(`${BASE_URL}/Auth/deleteAccount`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
