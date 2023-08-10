// Function to store a token in localStorage
export const storeToken = (token: string) => {
    localStorage.setItem("token", token);
  };
  
  // Function to retrieve the token from localStorage
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  // Function to remove the token from localStorage
  export const removeToken = () => {
    localStorage.removeItem("token");
  };