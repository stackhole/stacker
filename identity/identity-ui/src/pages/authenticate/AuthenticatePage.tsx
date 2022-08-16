import React from 'react';
import './AuthenticatePage.css';
import { Link, useSearchParams } from 'react-router-dom';

function AuthenticatePage() {
  
  const [searchParams] = useSearchParams();

  console.log(searchParams);
  console.log(searchParams.get("login_challenge"));
  return (
    <div>
      <h1>Choose an authentication method</h1>
      <nav>
        <Link to={`/password/${searchParams.get("login_challenge")}`}>Password</Link>
      </nav>
    </div>
  );
}

export default AuthenticatePage;
