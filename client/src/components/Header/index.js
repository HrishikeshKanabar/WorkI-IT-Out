import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-linear mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
      <div className="flex-row">
      <Link to="/">
      <img src={require('../../images/favicon.png')} alt=""/>
      </Link>
        <Link to="/">
          <h1>&nbsp; WorkI It Out</h1>
        </Link>
      </div>
      

        <nav className="text-center">
  {Auth.loggedIn() ? (
    <>
    <Link to="/"><img src={require('../../images/homepage.png')} alt=""/></Link>
    <Link to="/profile"><img src={require('../../images/user.png')} alt=""/></Link>
    <a href="/" onClick={logout}>
    <img src={require('../../images/logout.png')} alt=""/>
    </a>
    </>
  ) : (
    <>
      <Link to="/login"><img src={require('../../images/login.png')} alt=""/></Link>
      <Link to="/signup"><img src={require('../../images/signup.png')} alt=""/></Link>
    </>
  )}
</nav>
      </div>
    </header>
  );
};

export default Header;
