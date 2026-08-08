// function Card(props: any){
function Card({title, btnColor = "btn-warning", content, img, btn, children}: any){

    return(
        <>
            <div className="card">
            <img src={img} className="card-img-top" alt="image"/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {/* <p className="card-text">{content}</p> */}
                {children}
                <a href="#" className={`btn ${btnColor}`}>{btn}</a>
            </div>
            </div>
        </>
    )
}


export {Card}