// src/App.jsx
import React, { useEffect } from "react";
import { getMeApi } from "./services/allApis";
import useUserStore from "./utils/stores/userStore";

function App() {
   const{addUser, removeUser}=useUserStore()

  useEffect(() => {
  getMeApi()
    .then(res => {
      addUser({
        user: res.data.data,
        role: res.data.data.isAdmin ? "admin" : "user",
      });
    })
    .catch(() => {
      removeUser(); // optional
    });
}, []);


  return <div className="min-h-screen bg-base-200"></div>; // optional bg
}

export default App;