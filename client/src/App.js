import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/login';
import Dashboard from './components/dashboard';
import Profile from './components/profile';
import Post from './components/post';

export default function App() {
    return (
        <div className='container'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/post' element={<Post />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
