import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import createRouter from "./router/Router";
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import { titleContext } from "./contextApis/TitleContext";
import { loginContext } from "./contextApis/LoginContext";
import Cookies from "js-cookie";
function App() {
  const [isLoggedin, setisLoggedin] = useState(true);
  const [title, settitle] = useState("");
  document.title = `${title}-Bakery Management System`;
  const router = createRouter(isLoggedin);

  /* reseting state on page refresh based on token */
  const checkToken = Cookies.get('secret_token');
  useEffect(() => {
    if (!checkToken)
      setisLoggedin(false);
  }, []);

  return (
    <loginContext.Provider value={{ isLoggedin, setisLoggedin }}>
      <titleContext.Provider value={{ title, settitle }}>
        <RouterProvider router={router} />
      </titleContext.Provider>
    </loginContext.Provider>
  );
}

export default App;
