// pages/AuthPage.js

import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom"; // To navigate react with pages.

export default function AuthPage() {
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [authMode, setAuthMode] = useState("login"); // login/ signup, lets you toggle between them
  const navigate = useNavigate(); // a function to change pages

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent full page reload when submiting forms

    // signInWithPassword sends credentials to Supabase ans returns { data, error }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else navigate("/plants");  // login is a success navigate to plants page.
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    }); // signUp resgisters the user, user gets email to confirm sign up.

    if (error) alert(error.message);
    else alert("Signed up! Check your email to confirm.");
  };
  return (
    <div>
        {/** If authMode === 'login' the submit hander logs in, else signs up */}

      <h2>
        {
          authMode === "login"
            ? "Login"
            : "Sign Up" /* Javascript if else statemnt*/
        }
      </h2>
      <form onSubmit={authMode == "login" ? handleLogin : handleSignUp}>
        {/** Controlled input: value is sotred in state, OnChnage keeps state updated */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
            
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {authMode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
      <p>
        {authMode === "login"
          ? "Dont have an account"
          : "Already have an account"}
        <button
          type="button"
          onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
        >
          {authMode === "login" ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
