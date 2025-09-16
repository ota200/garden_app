import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function PlantsPage() {
  const [user, setUser] = useState(null); // currently logged in user
  
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  const [plants, setPlants] = useState([]); // Use state array

  useEffect(()=> { // After UI is shown run this code. To fetch data from servers or apis ( like supabase ), update page title.
    async function getUserAndPlants(){
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            setUser(user);
            fetchPlants(user.id);
        }
    }

    getUserAndPlants();
  }, []);
  


  const handleSubmit = async (e) => { // Make an asynconous funct so that it can wait and recive a result from the server
    e.preventDefault(); // To prevent default page load
    if (!user) return alert("Please log in first");
    
    const { data, error } = await supabase
      .from("plants")
      .insert([
        {name, type, date, user_id: user.id}
      ])
      .select();
    
    if (error){
      console.error("Supabase insert error: ",error);
      alert(error.message);
    } else {
    //const newPlant = {name, type, date }; // Turn the info gathered into an obj
      setPlants([...plants, data[0]]) // Add that obj to the usestate array 
      setName(''); // resets the useState to an empty string every time form is submited
      setType('');
      setDate('');
    }
  };

  const fetchPlants = async (userId) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("plants")
      .select("*")
      .eq("user_id", userId);
    
      if(error) console.error(error);
      else setPlants(data);
  };

  return (
    <div>
      {user ? (
      <>
      <form onSubmit={handleSubmit}>
        <input title='name' value = {name} onChange={(e) => setName(e.target.value)} placeholder= "Plant Name"/> 
        <input title='type' value = {type} onChange={(e) => setType(e.target.value)} /* onChange updates state when user types */ placeholder= "Plant Type"/>
        <input title="date" type = "date" value ={date} onChange={(e) => setDate(e.target.value)}/>
        <button type="submit">Add Plant</button>
      </form>
      
      <div>
        <p>Plants array length: {plants.length}</p>
        {plants.map((plant,index) => (
          <div key={index}> {/* keys are neccessary so react knows which items changed*/}
            <p>{plant.name} - {plant.type} - {plant.date}</p>
          </div>
        ))}
      </div>
      </>
    ) : (
        <p>Please Login first.</p>
    )} 
      {/* Anything in is treated as javascript. */}

    </div>
  );
}
