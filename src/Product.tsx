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
                <div className="trois">{prod.name}</div>
                <img onClick={startFabrication} className="productLogo" src={services.server + prod.logo} alt={prod.logo}/>
                <div className="quatre">Quantité: {prod.quantite}</div>
                <div className="cinq">Revenu: {prod.revenu}</div>
                <div className="six">
                    <span>Prix: {prod.cout} </span>
                    <span>Temps: {prod.timeleft} </span>
                </div>
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
