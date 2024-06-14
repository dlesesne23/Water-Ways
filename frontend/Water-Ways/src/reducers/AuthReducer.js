import { LOGIN_SUCCESS, LOGOUT } from '../components/authActions';

const initialState = {
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
};

export default authReducer;