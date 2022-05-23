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
          axios.interceptors.response.use((response) => {
            return response
          }, (error) => {
            if (error.response && error.response.data && error.response.data.location) {
              console.log("yay");
              window.location = error.response.data.location
            } else {
              console.log("false");
              return Promise.reject(error)
            }
            console.log(error);
            console.log(error.response.data);
            console.log(error.response.headers);
          })
          const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/consent/default`, {
            consent_challenge
          });
          const { responseURL } = result.request;
          console.log(responseURL);
          window.location = responseURL;
          
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
  );z1
}

export default App;
