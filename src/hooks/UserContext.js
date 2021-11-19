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
    console.log("logout");
    fetch(process.env.REACT_APP_API_URL + '/user/logout', {
      method: 'GET',
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        history.push('/login');
        setUser(null);
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
      console.log("hook res ", res);
      console.log("hook res ok = ", res.ok);
      if (!res.ok) {
        console.log("findUser not ok");
        setUser(null);
        setLoading(false);
        return false;
      } else {
        return res.json().then(user => {
          console.log("findUser is ok");
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