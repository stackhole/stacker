import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Issuer } from 'openid-client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const identityIssuer = await Issuer.discover('https://192.168.1.70/oidc');
console.log('Discovered issuer %s %O', identityIssuer.issuer, identityIssuer.metadata);
/*
const client = new identityIssuer.Client({
  client_id: 'zELcpfANLqY7Oqas',
  client_secret: 'TQV5U29k1gHibH5bx1layBo0OSAvAbRT3UYW3EWrSYBB5swxjVfWUa1BS8lqzxG/0v9wruMcrGadany3',
  redirect_uris: ['http://localhost:3000/view/user/me'],
  response_types: ['code'],
  // id_token_signed_response_alg (default "RS256")
  // token_endpoint_auth_method (default "client_secret_basic")
}); // => Client
*/
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
