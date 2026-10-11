import { useEffect, useState } from "react";

function Effect() {
    // const name = "Raju";
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    useEffect(()=>{
        console.log("Name useEffect called");
    }, []);
    useEffect(()=>{
        console.log("Age useEffect called");
    }, [age]);
    // const handleChange = (e: any) => {
    //     setName(e.target.value)
    //     console.log(name)
    // }
    return ( 
        <div>
            <h1>Effect</h1>
            {/* <input type="text" placeholder="Enter your name" onChange={handleChange} value={name} /> */}
            <input type="text" placeholder="Enter your name" onChange={(e) => {/* console.log(name); */setName(e.target.value)}} value={name} />
            <input type="number" placeholder="Enter your age" onChange={(e) => {/* console.log(name); */setAge(Number(e.target.value))}} value={age} />
        </div>
     );
}


// function NewEffect() {
//     return ( 
//         <div>
//             <h1>Effect 2</h1>
//             <input type="text" placeholder="Enter your name" />
//         </div>
//      );
// }
// function NewEffect3() {
//     return ( 
//         <div>
//             <h1>Effect 3</h1>
//             <input type="text" placeholder="Enter your name" />
//         </div>
//      );
// }

export default Effect;
// export {NewEffect};
// export {NewEffect3};