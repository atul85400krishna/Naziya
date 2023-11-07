export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const UPDATE_SKILLS = "UPDATE_SKILLS";
export const SET_SAVED_JOBS = "SET_SAVED_JOBS";
export const SET_ALL_CHATS = "SET_ALL_CHATS";

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("job-portal-token", action.payload.token);
      localStorage.setItem("job-portal-email", action.payload.email);
      localStorage.setItem("job-portal-role", action.payload.role);
      localStorage.setItem("job-portal-exp", action.payload.tokenExpTime);
      localStorage.setItem("job-portal-name", action.payload.name);
      localStorage.setItem("job-portal-id", action.payload.id);
      localStorage.setItem("job-portal-picture", action.payload.picture);
      localStorage.setItem(
        "job-portal-profile_picture",
        action.payload.profile_picture
      );
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        email: action.payload.email,
        role: action.payload.role,
        tokenExpTime: action.payload.tokenExpTime,
        name: action.payload.name,
        id: action.payload.id,
        profile: action.payload.profile,
        profile_picture: action.payload.profile_picture,
      };

    case LOGOUT_SUCCESS:
      console.log(`logout trigger`);
      localStorage.setItem("job-portal-token", "");
      localStorage.setItem("job-portal-email", "");
      localStorage.setItem("job-portal-role", "");
      localStorage.setItem("job-portal-exp", "");
      localStorage.setItem("job-portal-name", "");
      localStorage.setItem("job-portal-id", "");
      localStorage.setItem("job-portal-picture", "");
      localStorage.setItem("job-portal-profile_picture", "");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        email: null,
        role: null,
        tokenExpTime: null,
        name: null,
        id: null,
        profile: null,
        profile_picture: null,
      };

    case UPDATE_SKILLS:
      return {
        ...state,
        skills: action.payload,
      };

    case SET_SAVED_JOBS:
      return {
        ...state,
        savedJobs: action.payload,
      };

    case SET_ALL_CHATS:
      return {
        ...state,
        allChats: action.payload,
      };

    default:
      return state;
  }
};
