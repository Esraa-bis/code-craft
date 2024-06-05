import { sweetAlert } from "./sweetalert";

export const convertMinutes = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.round(duration % 60);

  if (hours > 0) {
    return `${hours}h ${minutes} m`;
  } else {
    return `${minutes} m`;
  }
};
export const checkLogin = (islogedIn) => {
  if (!islogedIn) {
    sweetAlert({
      title: "Please login first!",
    });
    return false;
  }
  return true;
};
