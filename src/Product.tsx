import { Services } from "./service"
import { Product, World } from "./world"
import './Product.css'

type ProductProps = {
    prod: Product
    services: Services
}
export default function ProductComponent({ prod, services }: ProductProps) {
    return (
        <div className="product">
                <div className="trois">{prod.name}</div>
                <img className="productLogo" src={services.server + prod.logo} alt={prod.logo}/>
                <div className="quatre">Quantité: {prod.quantite}</div>
                <div className="cinq">Revenu: {prod.revenu}</div>
                <div className="six">
                    <span>Prix: {prod.cout} </span>
                    <span>Temps: {prod.timeleft} </span>
                </div>
        </div>
    )
}
