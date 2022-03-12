import { Services } from "../service"
import { Pallier, Product, World } from "../world"

type UpgradeProps = {
    upgrade: Pallier
    services: Services
    world: World
    onUpgradeBuy: (seuil:number, upgrade:Pallier) => void
}
export default function UpgradeComponent({upgrade, services, world, onUpgradeBuy}:UpgradeProps){
    function buyUpgrade(){}
    return (
        <div key={upgrade.idcible} className="upgradegrid">
            <div>
                <img alt="upgrade logo" className="logo" src={services.server + upgrade.logo} />
            </div>
            <div className="infosUpgrade">
                <div className="upgradename"> { upgrade.name} </div>
                <div className="produitcible"> Améliore les revenus du produit : {world.products.product.find(produit => produit.id == upgrade.idcible)?.name}</div>
                <div className="upgradecost"> Coût : { upgrade.seuil} </div>
            </div>
            <div onClick={buyUpgrade}>
                <button className="buybutton" disabled={world.money < upgrade.seuil}>Acheter !</button>
            </div>
        </div>
    )
}