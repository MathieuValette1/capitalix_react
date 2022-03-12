import { useState } from "react"
import { Services } from "./service"
import { Pallier, World } from "./world"
import './Modale.css'


type UpgradesProps = {
    world : World 
    services : Services
    afficheUpgrades(): void
    hideUpgrades(): void
}

export default function Upgrades({world, services, afficheUpgrades, hideUpgrades}: UpgradesProps){

    function buyUpgrade(upgrade: Pallier){}

    return (
        <div className="modal">
            <div>
                <h1 className="title">Modale des upgrades</h1>
                <h2 className="soustitre"></h2>
            </div>
            <div>
                {world.upgrades.pallier.filter(upgrade => !upgrade.unlocked).map(upgrade =>
                    <div key={upgrade.idcible} className="upgradegrid">
                        <div>
                            <img alt="upgrade logo" className="logo" src={services.server + upgrade.logo} />
                        </div>
                        <div className="infosUpgrade">
                            <div className="upgradename"> { upgrade.name} </div>
                            <div className="produitcible"> Améliore les revenus du produit : {world.products.product.find(produit => produit.id == upgrade.idcible)?.name}</div>
                            <div className="upgradecost"> Coût : { upgrade.seuil} </div>
                        </div>
                        <div onClick={() => buyUpgrade(upgrade)}>
                            <button className="buybutton" disabled={world.money < upgrade.seuil}>Acheter !</button>
                        </div>
                    </div>
                )}
                <button onClick={hideUpgrades} className="closebutton" >Fermer</button>
            </div>
        </div>
    )
}