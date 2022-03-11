import { useState } from "react"
import { Services } from "./service"
import { Pallier, World } from "./world"

type UnlocksProps = {
    world : World 
    services : Services
    afficheUnlocks(): void
    hideUnlocks(): void
}

export default function Angels({world, services, afficheUnlocks, hideUnlocks}: UnlocksProps){

    return (
        <div className="modal">
            <div>
                <h1 className="title">Modale des unlocks</h1>
            </div>
        </div>
    )
}