import Img1 from './assets/img/img1.jpg';
import { Button } from './Button.tsx';
import Effect from './Effect.tsx';
import Event from './Event.tsx'
function Home(){
    const name = "Mina";
    const color = {
        color: 'red',
        fontSize: '50px'
    };
    const fontSize = {
        fontSize:'30px'
    };
    return (
        <>
        <div className="container p-5">
            <div className="row col-md-12">
                <h1>App Component</h1>
                <img src={Img1} alt="Image" style={{width:'300px', borderRadius:'20px'}} />
                <h3>Hello <span style={color}>{name}</span> i'm React😒</h3>
                <p style={fontSize}>Wel©️⭕me</p>
                <div>
                {/* <Event/> */}
                <Button btnTxT = "Login" type="button" />
                <Button btnTxT = "Registration"  type="submit"/>
                <button className='btn btn-success'>Success</button>

                <Effect/>  
            </div>
        </div>
      

    </div>
        </>
    )
}

export default Home;