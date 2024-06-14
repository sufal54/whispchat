const initialState = {
  userData: null,
  usersChat: null,
  selectUser: null,
  allUser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userData: action.payload,
      };
    case "SET_ALLUSER":
      return {
        ...state,
        allUser: action.payload,
      };
    case "SET_USERCHAT":
      return {
        ...state,
        usersChat: action.payload,
      };
    case "SET_OTHERUSERS":
      return {
        ...state,
        otherUsers: action.payload,
      };
    case "SET_SELECTUSER":
      return {
        ...state,
        selectUser: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
