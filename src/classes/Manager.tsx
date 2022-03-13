import { Services } from "../service"
import { transform } from "../utils"
import { Pallier, Product, World } from "../world"

type ManagerProps = {
    manager: Pallier
    services: Services
    world: World
    onManagerBuy: (seuil:number, manager:Pallier) => void
}
export default function ManagerComponent({manager, services, world, onManagerBuy}:ManagerProps){

    function hireManager(){
        if (world.money>=manager.seuil){
            // On transmet l'info à l'app
            onManagerBuy(manager.seuil, manager)
            // On désaffiche le manager
            manager.unlocked = true
            // On prévient le produit concerné
            let product = world.products.product.find(produit => produit.id == manager.idcible)
            // @ts-ignore
            console.log(product.name)
            // @ts-ignore
            product.managerUnlocked = true
        }
    }
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
                <div className="managercost"> Coût : { transform(manager.seuil)} </div>
            </div>
            <div onClick={hireManager}>
                <button className="buybutton" disabled={world.money < manager.seuil}>Enroler !</button>
            </div>
        </div>
    )
}