import { BASE_URL } from "./api";
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
