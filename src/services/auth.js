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
