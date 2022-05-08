export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token:
    "BQDsml8XTN8kVYzgGSar6DxYy3yrMEmFlDZZQlY3jjZlEEAkeAQxRF7pzSxYewR-ZQN0A8MreIWKFVdI_hOyMjp2hl4QSRAeg0vnOIQhaw7eOyQZZbUehVyaWfVvZjK1-_OK_nSbg5ytht70XiazMOBLn4Lnaw",
};
const reducer = (state, action) => {
  //   console.log(action); //THIS FOR debugger
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default reducer;
