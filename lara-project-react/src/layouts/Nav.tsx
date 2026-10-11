import { Link } from 'react-router'

export default function Nav() {
    return(
        <>
        <div className="py-6">
            <nav className='text-center '>
                <Link className='btn' to="/">Home</Link>
                <Link className='btn' to="/about">About</Link>
                <Link className='btn' to="/contact">Contact</Link>
                <Link className='btn' to="/users">Users</Link>
            </nav>
        </div>
        </>
    )
}