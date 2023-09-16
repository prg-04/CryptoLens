import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SignUp from './components/SignUp';
import Home from './components/Home';
import News from './components/News';
import NotFound from './components/NotFound';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="news/:id" element={<News />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
