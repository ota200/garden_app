import React from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom"; // To navigate react with pages.


export default function ProfilePage(){
    const navigate = useNavigate(); // a function to change pages

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) console.error("Error siging out: ", error.message);
        else navigate("/plants");  // login is a success navigate to plants page.
    }

    return(
        <div>
            <h1>Profile</h1>
            <button onClick={handleSignOut}>
                SignOut
            </button>
        </div>
    )
}