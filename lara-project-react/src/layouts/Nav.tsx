import { Link, useNavigate } from 'react-router'
import { api } from '../api';

export default function Nav() {
    const navigate = useNavigate();
    const handleLogout = () =>{
        // alert('Logout Clicked');
        api.post('logout')
            // .then(unction (res){
            //     console.log(res.data);
            // })
            // .then((res) =>
            //     console.log(res.data);
            // )
            .then(res => {
                console.log(res.data);
                if(res.status == 200){
                    localStorage.removeItem('lara_token');
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err);
            })

    }
    return(
        <>
        <div className="py-6">
            <nav className='text-center '>
                <Link className='btn' to="/">Home</Link>
                <Link className='btn' to="/about">About</Link>
                <Link className='btn' to="/contact">Contact</Link>
                <Link className='btn' to="/users">Users</Link>

                <button type='button' onClick={handleLogout} className='px-3 py-2 ms-3 rounded text-white bg-red-800 hover:bg-red-700 font-bold inline' >Logout</button>
            </nav>
        </div>
        </>
    )
}