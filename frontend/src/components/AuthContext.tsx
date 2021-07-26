import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  FC,
} from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = createContext<User>({ email: undefined });

type User = {
  email: string | undefined;
};

const isUser = (arg: any): arg is User => {
  if (arg !== null && typeof arg.email === "string") {
    return true;
  } else {
    return false;
  }
};

export function useAuthContext() {
  return useContext(AuthContext);
}

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>({ email: undefined }),
    [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const checkLogin = auth.onAuthStateChanged((user) => {
      if (isUser(user)) {
        setUser(user);
        setLoading(false);
        console.log(user);
      } else {
        setLoading(false);
        history.push("/signin");
      }
    });
    return () => {
      checkLogin();
    };
  }, []);

  const value = {
    email: user.email,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
