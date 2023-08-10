// Function to store a cookie in localStorage
export const storeCookie = (cookie: string) => {
    localStorage.setItem("cookie", cookie);
  };
  
  // Function to retrieve the cookie from localStorage
  export const getCookie = () => {
    return localStorage.getItem("cookie");
  };
  
  // Function to remove the cookie from localStorage
  export const removeCookie = () => {
    localStorage.removeItem("cookie");
  };