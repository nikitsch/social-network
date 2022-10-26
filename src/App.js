import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import UsersContainer from './components/Users/UsersContainer';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert("Some error occured");
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  };

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <BrowserRouter>
      {/* Перенести <BrowserRouter> в index 90у - 27м */}
        <div className="app-wrapper">
          <HeaderContainer />
          <Nav />
          <div className="app-wrapper-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            <Route
                path="/"
                element={
                  <Navigate to="/profile" />
                }
              />
              <Route
                path="/profile/"
                element={
                  <ProfileContainer />
                }
              />
              <Route
                path="/profile/:userId"
                element={
                  <ProfileContainer />
                }
              />
              <Route exact
                path="/dialogs"
                element={
                  <DialogsContainer />
                }
              />
              <Route
                path="/users"
                element={
                  <UsersContainer pageTitle={'Пользователи в этой сети'}/>
                }
              />
              <Route
                path="/login"
                element={
                  <Login />
                }
              />
              <Route
                path="*"
                element={
                  <div>404 NOT FOUND</div>
                }
              />
            </Routes>
            </Suspense>
          </div>
        </div>
      </BrowserRouter >
    );
  };
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);