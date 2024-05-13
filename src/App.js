import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import createRouter from "./router/Router";
function App() {
  const [isLoggedin, setisLoggedin] = useState(false);
  const router = createRouter(isLoggedin);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
