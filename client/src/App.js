import './App.css';
import CreateNote from './components/CreateNote';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import About from './components/About';
// import Footer from './components/Footer';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer/reducer';

export const UserContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<CreateNote />} />

          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/logout' element={<Logout />} />
          <Route exact path='/about' element={<About />} />


        </Routes>
      </UserContext.Provider>
      {/* <Footer /> */}
    </>
  );
}

export default App;
