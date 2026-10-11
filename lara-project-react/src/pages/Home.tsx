import { useState } from "react";
import Footer from "../layouts/Footer";
import Nav from "../layouts/Nav";

function Home() {
    const [count, setCount] = useState(10);
    const name = "Mina";
    return ( 
    <>

        <h1>Home Page</h1>
        <p>Hello {name}</p>
        <h2> Count: {count}</h2>
        <button onClick={()=> setCount(count + 1)}>Increment</button>
        <button onClick={()=> setCount(count - 1)}>Decrement</button>
        

    </>


     );
}

export default Home;
