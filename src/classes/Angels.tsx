import { useState } from "react"
import { Services } from "../service"
import { Pallier, World } from "../world"
import '../css/Modale.css'


type AngelProps = {
    world : World 
    services : Services
    afficheAngels(): void
    hideAngels(): void
    onWorldReset(): void
}

export default function Angels({world, services, afficheAngels, hideAngels, onWorldReset}: AngelProps){



    return (
        <div className="modal">
            <button onClick={hideAngels} className="closebutton" >&#x2718;</button>
            <div>
                <h1 className="title">Modale des sangliers</h1>
                <div>
                    <div>Sangliers totaux: {world.totalangels}</div>
                    <div>Sangliers actifs: {world.activeangels}</div>
                    <div>Sangliers accumulés: {150*Math.sqrt(world.score/Math.pow(10,15))-world.totalangels}</div>
                    <button onClick={onWorldReset} id="deletebutton" type="button">Reset world</button>
                </div>
            </div>
        </div>
    )
}