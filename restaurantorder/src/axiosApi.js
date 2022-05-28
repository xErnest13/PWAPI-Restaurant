import axios from 'axios';
import Cookies from 'js-cookie';

let authTokenRequest;
let axiosInstance;
let localhost_url = "http://localhost:8000/api";

  axiosInstance = axios.create({
    baseURL: localhost_url,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'X-CSRFTOKEN': Cookies.get('csrftoken'),
    },
    withCredentials: true,
    credentials: 'include',
    //xsrfHeaderName: "X-CSRFTOKEN",//"X-CSRFTOKEN",
    //xsrfCookieName: "csrftoken",
  });


// This function makes a call to get the auth token
// or it returns the same promise as an in-progress call to get the auth token
function getAuthToken() {
  if (!authTokenRequest) {
    authTokenRequest = axiosInstance.post('authentication/token/refresh/');
    authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
  }

  return authTokenRequest;
}

function resetAuthTokenRequest() {
  authTokenRequest = null;
}

axiosInstance.interceptors.response.use((response) => { return response },

  function (error) {
    const originalRequest = error;

    // Check if refresh_token has expired;

    if (error.response.status === 401 && originalRequest.config.url === 'authentication/token/refresh/') {
      window.alert("Your session has expired. You will be redirected to the login page.")
      localStorage.setItem('currentUser', null);
      localStorage.setItem('currentUserGroups', null);
      localStorage.setItem('currentUserEntity', null);
      window.location = '/login';

    }

    if (error.response.status === 401 && !originalRequest.config._retry && error.response.data.detail !== 'No active account found with the given credentials') {
      return getAuthToken().then(response => {
        originalRequest.config._retry = true;
        return axiosInstance(originalRequest.config);

      });
    }
    if (!error.response) {
    }
    return Promise.reject(error); // Note from Cristi: Do not think about deleting this line! Trust me ! I know from experience!
  }
);

export default axiosInstance;