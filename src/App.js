import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  const [user, setUser] = useState(null); // currently logged in user
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [authMode, setAuthMode] = useState("login") // login/ signup, lets you toggle between them
  const [plants, setPlants] = useState([]); // Use state array

  const handleSubmit = async (e) => { // Make an asynconous funct so that it can wait and recive a result from the server
    e.preventDefault(); // To prevent default page load
    if (!user) return alert("Please log in first");
    const { data, error } = await supabase
      .from("plants")
      .insert([
        {name, type, date, user_id: user.id}
      ]);
    
    if (error){
      console.error(error);
      alert("Error adding plant");
    } else {
    //const newPlant = {name, type, date }; // Turn the info gathered into an obj
      setPlants([...plants, data[0]]) // Add that obj to the usestate array 
      setName(''); // resets the useState to an empty string every time form is submited
      setType('');
      setDate('');
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) alert(error.message);
    else setUser(data.user);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) alert(error.message);
    else alert("Signed up! Check your email to confirm.");
  }
  return (
    <div>
      <h1>Hello</h1>
      <div>
        <h2>{authMode === "login" ? "Login": "Sign Up" /* Javascript if else statemnt*/}</h2>
        <form onSubmit={authMode == "login" ? handleLogin: handleSignUp}>
          <input
            type = "email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type = "password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{authMode === "login" ? "Login": "Sign Up"}</button>
        </form>
        <p>
          {authMode === "login" ? "Dont have an account": "Alerady have an account"}
          <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}>
            {authMode === "login" ? "Sign Up": "Login"}
          </button>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          title='name' 
          value = {name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder= "Plant Name"
        /> 
        <input
          title='type' 
          value = {type} 
          onChange={(e) => setType(e.target.value)} // onChange updates state when user types 
          placeholder= "Plant Type"
        />
        <input 
          title="date"
          type = "date"
          value ={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
      {/* Anything in is treated as javascript. */}
      <div>
        <p>Plants array length: {plants.length}</p>
        {plants.map((plant,index) => (
          <div key={index}> {/* keys are neccessary so react knows which items changed*/}
            <p>{plant.name} - {plant.type} - {plant.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
