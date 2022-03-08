import { useState } from "react"
import { Services } from "./service"
import { Product, World } from "./world"
import ProgressBar from "./ProgressBar"
import './Product.css'

type ProductProps = {
    prod: Product
    services: Services
}
export default function ProductComponent({ prod, services }: ProductProps) {
    const [progress, setProgress] = useState(0)

    return (

        <div  className="product">
            <img onClick={startFabrication} className="productLogo" src={services.server + prod.logo} alt={prod.logo}/><span> {prod.name} </span>
            <div><span>Quantité: {prod.quantite} </span>
                <span>Temps: {prod.timeleft} </span>
                <span>Revenu: {prod.revenu} </span></div>
            <div><span>Prix: {prod.cout} </span><span>Vitesse: {prod.vitesse}</span></div>
            <div className="progressBar">
                <ProgressBar transitionDuration={"0.1s"} customLabel={" "}
                             completed={progress}/>
            </div>
        </div>
    )
}

function startFabrication(){
    console.log("Icone cliquée")
}
