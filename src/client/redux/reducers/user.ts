import { SET_EMAIL, SET_IS_LOGGED_IN, SET_PASSWORD } from "../actionTypes";

import { UserAction, UserState } from "../../types";

export const initialState: UserState = {
  email: "",
  isLoggedIn: false,
  password: "",
};

const reducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case SET_EMAIL: {
      return { ...state, email: action.payload.email };
    }
    case SET_IS_LOGGED_IN: {
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    }
    case SET_PASSWORD: {
      return { ...state, password: action.payload.password };
    }
    default:
      return state;
  }
};

export default reducer;
