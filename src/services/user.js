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

let USER_LOADED = false;
export const isUserLoaded = () => USER_LOADED;
export const setIsUserLoaded = (value) => {
  USER_LOADED = value;
};

export async function getUser() {
  const response = await fetch(`${BASE_URL}/User/get_user_profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  // when the problem is fixed:

  // uncomment this line:
  // return response.json();

  // delete those lines:
  // start delete
  const res = await response.json();
  res.profile = {
    ...res.profile,
    firstname: res.profile.firstName,
    lastname: res.profile.lastName,
    phonenumber: res.profile.phoneNumber,
    bio: res.profile.Bio,
    contactinfo: res.profile.contactInfo,
  };

  delete res.profile.firstName;
  delete res.profile.lastName;
  delete res.profile.phoneNumber;
  delete res.profile.Bio;
  delete res.profile.contactInfo;

  return res;
  // end delete
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

// change password

export async function changePassword({
  oldPassword,
  newPassword,
  confirmPassword,
}) {
  const response = await fetch(`${BASE_URL}/User/updatePassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
      confirmPassword,
    }),
  });

  return response.json();
}

// Update Photo
export async function updateProfilePicture({ oldPublicId, file }) {
  const formData = new FormData();
  formData.append("oldPublicId", oldPublicId);
  formData.append("profile", file);
  const response = await fetch(`${BASE_URL}/User/update_profile_pic`, {
    method: "PATCH",
    headers: {
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: formData,
  });

  return response.json();
}

// Update Photo
export async function uploadProfilePicture({ file }) {
  const formData = new FormData();
  // formData.append("oldPublicId", oldPublicId);
  formData.append("profile", file);
  const response = await fetch(`${BASE_URL}/User/uploadProfilePic`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data; charset=UTF-8; boundary=&;",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: formData,
  });

  return response.json();
}

// Delete Photo

export async function deleteProfilePicture() {
  const response = await fetch(`${BASE_URL}/User/remove_profile_pic`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}
