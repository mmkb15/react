import './Button.css'

function Button(props: any){
    return(
        <button  type={props.type}>{props.btnTxT}</button>
    )
}

export {Button}