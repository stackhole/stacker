import { Button, TextField } from '@mui/material';
import axios from 'axios';
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
          const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login/password`, {
            challenge
          });
          const { responseURL } = result.request;
          const location = responseURL.lastIndexOf('/consent?');
          if(location === -1)
          {
            throw Error("Redirect does not match consent page");
          }
          navigate(responseURL.substring(location,responseURL.length));
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
