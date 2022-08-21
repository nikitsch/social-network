import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Nav from './components/Nav/Nav';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer /> 
        <Nav />
        <div className="app-wrapper-content">
          <Routes>
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
            <Route
              path="/dialogs"
              element={
                <DialogsContainer />
              }
            />
            <Route
              path="/users"
              element={
                <UsersContainer />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
