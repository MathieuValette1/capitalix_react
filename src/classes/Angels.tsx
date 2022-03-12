import { useState } from "react"
import { Services } from "../service"
import { Pallier, World } from "../world"
import '../css/Modale.css'


type AngelProps = {
    world : World 
    services : Services
    afficheAngels(): void
    hideAngels(): void
}

export default function Angels({world, services, afficheAngels, hideAngels}: AngelProps){

    return (
        <div className="modal">
            <div>
                <h1 className="title">Modale des anges</h1>
            </div>
        </div>
    )
}