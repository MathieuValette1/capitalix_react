import { Services } from "./service"
import { Product } from "./world"

type ProductProps = {
    prod: Product
    services: Services
}
export default function ProductComponent({ prod, services }: ProductProps) {
    return (
        <div>
            <img className="productLogo" src={services.server + prod.logo} alt={prod.logo}/><span> {prod.name} </span>
            <div><span>Quantité: {prod.quantite} </span>
                <span>Temps: {prod.timeleft} </span>
                <span>Revenu: {prod.revenu} </span></div>
            <div><span>Prix: {prod.cout} </span><span>Vitesse: {prod.vitesse}</span></div>
        </div>
    )
}
