import { useState } from "react"
import { Services } from "../service"
import { Pallier, World } from "../world"
import '../css/Modale.css'
import ManagerComponent from "./Manager"

type ManagerModalProps = {
    world : World 
    services : Services
    afficheManagers(): void
    hideManagers(): void
    onManagerBuy: (seuil:number, manager:Pallier) => void
}

export default function ManagerModal({world, services, afficheManagers, hideManagers, onManagerBuy}: ManagerModalProps){

    return (
        <div className="modal">
            <div>
                <h1 className="title">Directrix</h1>
                <h2 className="soustitre">Ne laisse pas le ciel te tomber sur la tête grâce aux directrix.<br></br>
                    Embauche les et ils gèreront pour toi la mise en production des produits que tu possèdes !</h2>
            </div>
            <div>
                {world.managers.pallier.filter( manager => !manager.unlocked).map(manager =>
                        <ManagerComponent manager= {manager}
                                          services={ services }
                                          world ={world}
                                          onManagerBuy = {onManagerBuy}
                        />
                    )
                }
                <button onClick={hideManagers} className="closebutton" >Fermer</button>
            </div>
        </div>
    )
}