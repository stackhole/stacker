import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PasswordPage.css';



function App() {
  const navigate = useNavigate();
  let { challenge } = useParams();

  return (
    <div>
      <TextField id="username" label="Username" variant="standard" />
      <TextField id="password" label="Password" type="password" variant="standard" />
      <Button onClick={async () => {
        try{
          const result = await axios.get("/");
          console.log(result.data);
          navigate("/success");
        }
        catch(error){
          console.log(error);
          console.log(challenge);
        }
      }}>
        Login
      </Button>
    </div>
  );
}

export default App;
