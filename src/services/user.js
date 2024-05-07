import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";

export const SOCIAL_MEDIA_INDEX = {
  facebook: 0,
  twitter: 1,
  linkedin: 2,
};

export const SOCIAL_MEDIA_KEYS = {
  facebook: "facebook",
  twitter: "twitter",
  linkedin: "linkedin",
};

export async function getUser() {
  const response = await fetch(`${BASE_URL}/User/get_user_profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}

export async function editProfile({
  firstname,
  lastname,
  phonenumber,
  bio,
  experience,
  education,
  contactinfo,
}) {
  const response = await fetch(`${BASE_URL}/User/update_profile_date`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: JSON.stringify({
      firstname,
      lastname,
      phonenumber,
      bio,
      experience,
      education,
      contactinfo,
    }),
  });

  return response.json();
}
