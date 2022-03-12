import { Services } from "../service"
import { Pallier, Product, World } from "../world"

type ManagerProps = {
    manager: Pallier
    services: Services
    world: World
}
export default function ManagerComponent({manager, services, world}:ManagerProps){

    function hireManager(){}
    return (
        <div key={manager.idcible} className="managergrid">
            <div>
                <div>
                    <img alt="manager logo" className="logo" src= {services.server + manager.logo} />
                </div>
            </div>
            <div className="infosmanager">
                <div className="managername"> { manager.name} </div>
                <div className="managercible"> Gère la vente de {world.products.product.find(produit => produit.id == manager.idcible)?.name } </div>
                <div className="managercost"> Coût : { manager.seuil} </div>
            </div>
            <div onClick={hireManager}>
                <button className="buybutton" disabled={world.money < manager.seuil}>Enroler !</button>
            </div>
        </div>
    )
}