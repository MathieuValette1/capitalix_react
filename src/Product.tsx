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
        <div className="product">
            <div className="productInfo">
                <img onClick={startFabrication} className="productLogo" src={services.server + prod.logo} alt={prod.logo}/>
                <div className="qte">Quantité: {prod.quantite}</div>
            </div>
            <div className="revenu">Revenu: {prod.revenu}</div>
            <div className="prixStand"><button type="button"> Prix: {prod.cout} </button></div>
            <div className="temps">Temps: {prod.vitesse}s</div>
            <div className="progressBar">
                <ProgressBar transitionDuration={"0.1s"} customLabel={" "} completed={progress}/>
            </div>
        </div>
    )
}

function startFabrication(){
    console.log("Icone cliquée")
}
