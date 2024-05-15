import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import createRouter from "./router/Router";
import { titleContext } from "./contextApis/TitleContext";
import { loginContext } from "./contextApis/LoginContext";
function App() {
  const [isLoggedin, setisLoggedin] = useState(false);
  const [title, settitle] = useState("");
  document.title = `${title}-Bakery Management System`;
  const router = createRouter(isLoggedin);
  
  /* reseting state on page refresh based on token */
  const checkToken = localStorage.getItem('secret_token');
  useEffect(() => {
    if (checkToken)
      setisLoggedin(true);
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
