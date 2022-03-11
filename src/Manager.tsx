import { useState } from "react"
import { Services } from "./service"
import { Pallier, World } from "./world"
import './Modale.css'

type ManagerProps = {
    world : World 
    services : Services
    afficheManagers(): void
    hideManagers(): void
}

export default function Manager({world, services, afficheManagers, hideManagers}: ManagerProps){

    function hireManager(manager: Pallier){}

    return (
        <div className="modal">
            <div>
                <h1 className="title">Managers make you feel better !</h1>
            </div>
            <div>
                {world.managers.pallier.filter( manager => !manager.unlocked).map(manager =>
                    <div key={manager.idcible} className="managergrid">
                        <div>
                            <div className="logo">
                                <img alt="manager logo" className="round" src= {services.server + manager.logo} />
                            </div>
                        </div>
                        <div className="infosmanager">
                            <div className="managername"> { manager.name} </div>
                            <div className="managercible"> {world.products.product[manager.idcible-1].name } </div>
                            <div className="managercost"> { manager.seuil} </div>
                        </div>
                        <div onClick={() => hireManager(manager)}>
                            <button disabled={world.money < manager.seuil}>Hire !</button>
                        </div>
                    </div>)
                }
                <button onClick={hideManagers} className="closebutton" >Fermer</button>

            </div>
        </div>
    )
}