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

    return (
        <div className="modal">
            <div>
                <h1 className="title">Modale des upgrades</h1>
            </div>
        </div>
    )
}