import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);




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
    route: '/view/user/:id'
  },
  {
    page: React.lazy(() => import('./pages/callback/Callback')) ,
    route: '/view/callback'
  },
  /*{
    page: React.lazy(() => import('./pages/callback/CallbackPage')) ,
    route: '/callback'
  },*/
].map(RouteDefinition);

root.render(
  <React.StrictMode>g
    <Router basename={`${process.env.REACT_APP_BASE_NAME||''}`}>
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
