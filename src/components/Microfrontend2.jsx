import { useMicrofrontendContext } from "@/context/MicrofrontendContext";
import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import toast from "react-hot-toast";

const UserForm = dynamic(
  () =>
    import("mfeApp2/UserForm").catch(
      () =>
        function showImportError() {
          return <p>Microfrontend is down.</p>;
        }
    ),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  }
);

const Microfrontend2 = () => {
  const { user, setUser, emitter } = useMicrofrontendContext();

  const handleSaveUser = (user) => {
    setUser(user);
    if (user.email) {
      toast.success("User login globally in container app");
    } else {
      toast.success("User logout successfully");
    }
  };

  useEffect(() => {
    const unbind = emitter.on("saveUser", (user) => handleSaveUser(user));
    return () => {
      unbind();
    };
  }, [emitter]);

  useEffect(() => {
    emitter.emit("updateUser", user);
  }, [user, emitter]);

  return <UserForm emitter={emitter} />;
};

export default Microfrontend2;
