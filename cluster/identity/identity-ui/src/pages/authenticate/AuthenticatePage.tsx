import React from 'react';
import './AuthenticatePage.css';
import { Link, useParams } from 'react-router-dom';

function AuthenticatePage() {
  let { challenge } = useParams();
  return (
    <div>
      <h1>Choose an authentication method</h1>
      <nav>
        <Link to={`/password/${challenge}`}>Password</Link>
      </nav>
    </div>
  );
}

export default AuthenticatePage;
