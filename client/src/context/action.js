export const setUserData = (userData) => ({
  type: "SET_USER",
  payload: userData,
});

export const setUsersChat = (userData) => ({
  type: "SET_USERCHAT",
  payload: userData,
});

export const setSelectUser = (userData) => ({
  type: "SET_SELECTUSER",
  payload: userData,
});

export const setOtherUsers = (userData) => ({
  type: "SET_OTHERUSERS",
  payload: userData,
});

export const setAllUser = (userData) => ({
  type: "SET_ALLUSER",
  payload: userData,
});
