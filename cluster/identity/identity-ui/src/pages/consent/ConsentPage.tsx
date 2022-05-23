import { Button } from '@mui/material';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './ConsentPage.css';


function App() {
  //const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let consent_challenge = searchParams.get("consent_challenge");
  console.log(consent_challenge);
  return (
    <div>
      <Button onClick={async () => {
        try{
          const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/consent/default`, {
            consent_challenge
          });
          console.log(result);
          window.location = result.redirect_to;
          
          //navigate("/success");
        }
        catch(error){
          console.log(error);
          console.log(consent_challenge);
        }
      }}>
        Consent?
      </Button>
    </div>
  );
}

export default App;
