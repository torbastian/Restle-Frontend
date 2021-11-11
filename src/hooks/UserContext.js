import { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

const UserContext = createContext(null);

function UserProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    findUser();
  }, []);

  function logout() {
    fetch(process.env.REACT_APP_API_URL + '/user/logout', {
      method: 'GET',
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        setUser(null);
        history.push('/login');
      }
    });
  }

  function findUser() {
    fetch(process.env.REACT_APP_API_URL + '/user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => {
      if (!res.ok) {
        setUser(null);
        setLoading(false);
        return false;
      } else {
        return res.json().then(user => {
          setUser(user);
          setLoading(false);
          return true;
        });
      }
    }).catch(() => {
      console.log("Failed to fetch user");
    })
  }

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  return useContext(UserContext);
}

export { UserContext, useUserContext };
export default UserProvider;