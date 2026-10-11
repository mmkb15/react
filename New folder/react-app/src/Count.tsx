import { Button } from "./Button.tsx";

import { useState } from "react";

function Count(){
    const [num, setNum] = useState(0);
    // const handleIncrement = () => {
    //     console.log("Increment");
    //     setNum(num+1)
    // }
    // const handleDecrement = () => {
    //     console.log("Increment");
    //     setNum(num-1)
    // }
    return(
        <>
{/*         
            <button className="button" onClick={handleIncrement}>+</button>
            <h1>Count : {num}</h1>
            <button className="button" onClick={handleDecrement}>-</button>
            */}
            <div style={{textAlign:"center"}}>
                <h1>Count : {num}</h1>
                <button className="button" onClick={() => setNum(num + 1)}><span>+</span></button>
                <button className="button" onClick={() => setNum(num - 1)}><span>-</span></button>
            </div>

        </>
    )
}

export default Count;