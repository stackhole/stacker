import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthorizationServiceConfiguration, RedirectRequestHandler, LocalStorageBackend, DefaultCrypto, FetchRequestor } from '@openid/appauth';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const oidcUrl="https://192.168.1.70/oidc";
AuthorizationServiceConfiguration.fetchFromIssuer(oidcUrl, new FetchRequestor())
            .then((response) => {
              console.log(JSON.stringify(response,null,4));
              /*
                const authRequest = new AuthorizationRequest({
                    client_id: environment.clientId,
                    redirect_uri: environment.redirectURL,
                    scope: environment.scope,
                    response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
                    state: undefined,
                    // extras: environment.extra
                });
                authorizationHandler.performAuthorizationRequest(response, authRequest);*/
            })
            .catch(error => {
              console.log(error);
            });


const Fallback = () => <div>Loading...</div>

const RouteDefinition = (routeDefinition:any) => {
  const RoutedPage = routeDefinition.page;
  return <Route path={routeDefinition.route} element={
        <Suspense fallback={<Fallback/>}>
        <RoutedPage />
      </Suspense>
  }/>
}

const routes = [
  {
    page: React.lazy(() => import('./pages/user/UserPage')) ,
    route: '/user/:id'
  },
].map(RouteDefinition);

root.render(
  <React.StrictMode>
    <Router basename={`${process.env.REACT_APP_BASE_NAME||''}/view`}>
      <Routes>
        {routes}
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
