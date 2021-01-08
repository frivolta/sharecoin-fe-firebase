import { User } from "firebase";
import * as React from "react";
import Firebase from "../../firebase/config";

type FireAuthProviderProps = {
  children: React.ReactNode;
};

type FireAuthProviderState = {
  authStatusReported: boolean;
  isUserSignedIn: boolean;
  currentUser: User | null;
  isLoading: boolean;
};

const defaultFirebaseContext = {
  authStatusReported: false,
  isUserSignedIn: false,
  currentUser: null,
  isLoading: false,
};

const FirebaseAuthContext = React.createContext<FireAuthProviderState>(
  defaultFirebaseContext
);

const FirebaseAuthProvider: React.FC<FireAuthProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [isUserSignedIn, setIsUserSignedIn] = React.useState<boolean>(false);
  const [authStatusReported, setAuthStatusReported] = React.useState<boolean>(
    false
  );
  React.useEffect(() => {
    setIsLoading(true);
    const unsubscribe = Firebase.auth().onAuthStateChanged(
      (userAuth: User | null): void => {
        setCurrentUser(userAuth);
        setIsUserSignedIn(!!userAuth);
        setAuthStatusReported(true);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, [currentUser]);

  return (
    <FirebaseAuthContext.Provider
      value={{ currentUser, isLoading, isUserSignedIn, authStatusReported }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const useFirebaseAuthContext = () => React.useContext(FirebaseAuthContext);

export { FirebaseAuthProvider, useFirebaseAuthContext };
