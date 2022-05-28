import { RedirectRequestHandler, LocalStorageBackend, DefaultCrypto, AuthorizationServiceConfiguration, FetchRequestor, AuthorizationRequest } from '@openid/appauth';
import { useParams } from 'react-router-dom';
import { NoHashQueryStringUtils } from '../../noHashQueryStringUtils';
import './UserPage.css';




function App() {
  let { id } = useParams();
  let login = () => {
    const authorizationHandler = new RedirectRequestHandler(new LocalStorageBackend(), new NoHashQueryStringUtils(), window.location, new DefaultCrypto());
    AuthorizationServiceConfiguration.fetchFromIssuer(process.env.REACT_APP_ISSUER || '', new FetchRequestor())
      .then((response) => {
        const authRequest = new AuthorizationRequest({
          client_id: process.env.REACT_APP_CLIENT_ID || '',
          redirect_uri: process.env.REACT_APP_REDIRECT_URI || '',
          scope: process.env.REACT_APP_API_SCOPE || '',
          response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
          state: undefined,
        });
        authorizationHandler.performAuthorizationRequest(response, authRequest);
      })
      .catch(oError => {
        console.log(oError);
      });
  }

  if (id === "me"){
    console.log("self");
  }
  return (
    <div>
      User ID: ${id}
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
