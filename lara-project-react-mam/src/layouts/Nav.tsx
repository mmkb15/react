import React from 'react'
import { Link } from 'react-router'

export default function Nav() {
  return (
    <>
        <nav className='bg-emerald-200 text-center'>
            <Link to="/" className='py-3 px-4 hover:text-emerald-800 font-bold inline-block'>Home</Link>
            <span> | </span>
            <Link to="/about" className='py-3 px-4 hover:text-emerald-800 font-bold inline-block'>About</Link>
            <span> | </span>
            <Link to="/contact" className='py-3 px-4 hover:text-emerald-800 font-bold inline-block'>Contact</Link>
            <span> | </span>
            <Link to="/users" className='py-3 px-4 hover:text-emerald-800 font-bold inline-block'>Users</Link>
        </nav>
    </>
  )
}
