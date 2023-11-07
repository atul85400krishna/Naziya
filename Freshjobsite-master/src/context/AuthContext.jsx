import { createContext, useReducer } from "react";
import { authReducer } from "./authReducer";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export function API(method, endpoint, payload, token) {
  console.log(
    "url base",
    `${BASE_URL}/${endpoint.startsWith("/") ? endpoint.slice(1) : endpoint}`
  );
  const encrypted = "" || token;
  return axios({
    method: method.toLowerCase(),
    url: `${BASE_URL}/${
      endpoint.startsWith("/") ? endpoint.slice(1) : endpoint
    }`,
    data: payload,
    headers: {
      Authorization: `Bearer ${encrypted}`,
    },
  });
}

const token = localStorage.getItem("job-portal-token")
  ? localStorage.getItem("job-portal-token")
  : "";
const email = localStorage.getItem("job-portal-email")
  ? localStorage.getItem("job-portal-email")
  : "";
const role = localStorage.getItem("job-portal-role")
  ? localStorage.getItem("job-portal-role")
  : "";
const tokenExpTime = localStorage.getItem("job-portal-exp")
  ? localStorage.getItem("job-portal-exp")
  : "";
const name = localStorage.getItem("job-portal-name")
  ? localStorage.getItem("job-portal-name")
  : "";
const id = localStorage.getItem("job-portal-id")
  ? localStorage.getItem("job-portal-id")
  : "";
const picture = localStorage.getItem("job-portal-picture")
  ? localStorage.getItem("job-portal-picture")
  : "";
const profile_picture = localStorage.getItem("job-portal-profile_picture")
  ? localStorage.getItem("job-portal-profile_picture")
  : "";

const initialAuthState = {
  isAuthenticated: !!token && !!email,
  token,
  email,
  tokenExpTime,
  role,
  name,
  id,
  picture,
  profile_picture,
};

const AuthContext = createContext({
  state: initialAuthState,
  dispatch: () => {},
});

const getTokenExpTime = () => {
  const currentDateTime = new Date();
  const oneHourLater = new Date(currentDateTime.getTime() + 60 * 60 * 1000);
  return oneHourLater;
};

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const UPDATE_SKILLS = "UPDATE_SKILLS";
const SET_SAVED_JOBS = "SET_SAVED_JOBS";
const SET_ALL_CHATS = "SET_ALL_CHATS";

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const login = async (values) => {
    try {
      const res = await axios.post(BASE_URL + "/users/login/", values);
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res?.data?.token,
          email: res?.data?.email,
          role: res?.data?.role,
          name: res?.data?.name,
          id: res?.data?.id,
          picture: res?.data?.picture,
          profile_picture: res?.data?.profile_picture,
          tokenExpTime: getTokenExpTime(),
        },
      });
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const socialLogin = (data) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: data?.token,
        email: data?.email,
        role: data?.role,
        name: data?.name,
        id: data?.id,
        picture: data?.picture,
        profile_picture: data?.profile_picture,
        tokenExpTime: getTokenExpTime(),
      },
    });
  };

  const getSavedJobs = async () => {
    try {
      const token = state.token;
      const res = await API("get", "/users/savedjobs/", {}, token);
      console.log(res);
      dispatch({ type: SET_SAVED_JOBS, payload: res?.data });
    } catch (error) {
      console.log(error);
    }
  };

  const setSavedJobs = (data) => {
    dispatch({
      type: SET_SAVED_JOBS,
      payload: data,
    });
  };

  const getAllChats = async () => {
    try {
      const token = state.token;
      const res = await API("get", "/users/chat/", {}, token);
      console.log(res?.data?.results);
      dispatch({ type: SET_ALL_CHATS, payload: res?.data?.results });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT_SUCCESS });
  };

  const updateSkills = async (data) => {
    dispatch({ type: UPDATE_SKILLS, payload: data });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
        updateSkills,
        socialLogin,
        setSavedJobs,
        getSavedJobs,
        getAllChats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
