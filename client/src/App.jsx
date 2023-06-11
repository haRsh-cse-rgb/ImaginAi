import React from 'react'
import { BrowserRouter as Router , Link , Route , Routes } from 'react-router-dom'


import {logo3} from './assets'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

const App = () => {
  return (
    <Router>
      <header className='w-full flex justify-between items-center bg-[#202123] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
      <Link to="/">
        <img src={logo3} alt="logo"
        className='w-1/3 object-contain'/>
        </Link>

        <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create</Link>
      </header>
    <main className='sm:p-8 px-4 py-8 w-full min-h[calc(100vh-73px)]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
      </Routes>
    </main>
    </Router>

  )
}

export default App