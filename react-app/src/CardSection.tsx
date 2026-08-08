import { Card } from "./Card";



function CardSection(){


    return(
        <>
        <div className="container py-5">
            <div className="row">

                <div className="col-md-4">
                <Card 
                    img="https://picsum.photos/400/200"
                    title= "Card Title 01"
                    content= "Some quick example text to build on the card title and make up the bulk of the card’s content. - from Card Title 01"
                    btn= "Button 01"
                    // btnColor = "btn-primary"
                >
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid culpa atque adipisci quas illo excepturi tempora odio facilis corporis vitae rem dicta nostrum assumenda provident dignissimos nemo similique, quaerat illum.</p>
                </Card>
                </div>

                <div className="col-md-4">
                <Card 
                    img="https://picsum.photos/401/200"
                    title= "Card Title 02"
                    content= "Some quick example text to build on the card title and make up the bulk of the card’s content. - from Card Title 02"
                    btn= "Button 02"
                    btnColor = "btn-danger"
                >
                    <ul>
                        <li>item01</li>
                        <li>item02</li>
                        <li>item03</li>
                        <li>item04</li>
                        <li>item05</li>
                    </ul>
                </Card>
                </div>

                <div className="col-md-4">
                <Card 
                    img="https://picsum.photos/402/200"
                    title= "Card Title 03"
                    content= "Some quick example text to build on the card title and make up the bulk of the card’s content. - from Card Title 03"
                    btn= "Button 03"
                    btnColor = "btn-success"
                >
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid culpa atque adipisci quas illo excepturi tempora odio facilis corporis vitae rem dicta nostrum assumenda provident dignissimos nemo si          `   ellendus nulla magni.   </p>
                </Card>
                </div>

             </div>
        </div>


        </>
    )

}


export {CardSection}