export const setlocalStorage = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const getlocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const getlUrlPaths = () => {
  return decodeURI(window.location.pathname).split("/").slice(1);
};

export const SIGNED_IN_USER = "signedInUser";
export const FOLDER_JSON = "folderJson";
export const SIGNED_UP_USERS = "signedUpUsers";
