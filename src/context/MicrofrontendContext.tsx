import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Emitter, createNanoEvents } from "nanoevents";
import { UserInterface } from "@/interfaces";

type Props = {
  children: ReactNode;
};

interface Events {
  updateUser: (user: UserInterface) => void;
  saveUser: (user: UserInterface) => void;
  userLoggedIn: (value: boolean) => void;
}

interface MicrofrontendContextInterface {
  user: UserInterface;
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  emitter: Emitter<Events>;
}

const MicrofrontendContext = createContext<MicrofrontendContextInterface>(
  {} as MicrofrontendContextInterface
);

const MicrofrontendProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserInterface>({});
  const emitter = createNanoEvents<Events>();

  useEffect(() => {
    if (user.email) {
      emitter.emit("userLoggedIn", true);
    } else {
      emitter.emit("userLoggedIn", false);
    }
  }, [user, emitter]);

  const context = {
    user,
    setUser,
    emitter,
  };

  return (
    <MicrofrontendContext.Provider value={context}>
      {children}
    </MicrofrontendContext.Provider>
  );
};

const useMicrofrontendContext = () => useContext(MicrofrontendContext);

export { MicrofrontendContext, MicrofrontendProvider, useMicrofrontendContext };
