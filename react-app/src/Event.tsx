// import function Event() {
//     return(
//         <>
//             <button>Click</button>
//         </>
//     )
// }

function Event() {
    const handelClick = () => {
        console.log("Button Clicked");
    }
    return(
        <>
            <button onClick={handelClick}>Click</button>
        </>
    )
}

export default Event;

