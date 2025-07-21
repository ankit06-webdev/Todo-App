import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-around p-4 text-white bg-gradient-to-r from-violet-600 to-indigo-600'>
        <div className="logo">
            <span className='text-2xl cursor-pointer font-bold font-poppins'>My Tasks</span>
        </div>
      <ul className="flex gap-7 text-lg">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
