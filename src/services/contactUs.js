import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";
export async function contactUs({ name, email, message, file, phoneNumber }) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);
  formData.append("file", file);
  formData.append("phoneNumber", phoneNumber);

  const response = await fetch(`${BASE_URL}/contactUs/contact-us`, {
    method: "POST",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: formData,
  });

  return response.json();
}
