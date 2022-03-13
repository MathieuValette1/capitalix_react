import { useState } from "react"
import { Services } from "../service"
import { Pallier, World } from "../world"
import '../css/Modale.css'
import UpgradeComponent from "./Upgrade"


type UpgradesProps = {
    world : World 
    services : Services
    afficheUpgrades(): void
    hideUpgrades(): void
    onUpgradeBuy: (seuil:number, upgrade:Pallier) => void
}

export default function Upgrades({world, services, afficheUpgrades, hideUpgrades, onUpgradeBuy}: UpgradesProps){

    return (
        <div className="modal">
            <div>
                <h1 className="title">Modale des upgrades</h1>
            </div>
            <div>
                {world.upgrades.pallier.filter(upgrade => !upgrade.unlocked).map(upgrade =>
                    <UpgradeComponent upgrade= {upgrade}
                                      services={ services }
                                      world ={world}
                                      onUpgradeBuy = {onUpgradeBuy}
                    />
                )}
                <button onClick={hideUpgrades} className="closebutton" >Fermer</button>
            </div>
        </div>
    )
}