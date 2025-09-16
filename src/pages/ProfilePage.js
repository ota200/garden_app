import React from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom"; // To navigate react with pages.
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // a function to change pages

  useEffect(() => {
    // After UI is shown run this code. To fetch data from servers or apis ( like supabase ), update page title.
    async function fetchUserEmails() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) setError(error.messsage);
        else if (user) setUserEmail(user.email);
        else setUserEmail(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserEmails();
  }, []);

  if(loading){ return <p>Loading user data</p>}

  if(error) {return <p>Error{error}</p>}


  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) console.error("Error siging out: ", error.message);
    else navigate("/plants"); // login is a success navigate to plants page.
  };

  return (
    <div>


      <div>
        {userEmail ? (
            <><h1>Profile</h1>
            <button onClick={handleSignOut}>SignOut</button>
            <p>Welcome: {userEmail}</p></>
        ): (
            <p>No user logged in.</p>
        )}
      </div>
    </div>
  );
}
