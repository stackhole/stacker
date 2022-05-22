import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ConsentPage.css';


function App() {
  //const navigate = useNavigate();
  let { consent_challenge } = useParams();
  console.log(consent_challenge);
  return (
    <div>
      <TextField id="username" label="Username" variant="standard" />
      <TextField id="Consent" label="Consent" type="Consent" variant="standard" />
      <Button onClick={async () => {
        try{
          const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/oidc/consent`, {
            consent_challenge
          });
          console.log(result);
          //navigate("/success");
        }
        catch(error){
          console.log(error);
          console.log(consent_challenge);
        }
      }}>
        Login
      </Button>
    </div>
  );
}

export default App;
