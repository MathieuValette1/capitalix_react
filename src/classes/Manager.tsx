import { useState } from "react"
import { Services } from "../service"
import { Pallier, World } from "../world"
import '../css/Modale.css'

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
                <h1 className="title">Directrix</h1>
                <h2 className="soustitre">Ne laisse pas le ciel te tomber sur la tête grâce aux directrix.<br></br>
                    Embauche les et ils gèreront pour toi la mise en production des produits que tu possèdes !</h2>
            </div>
            <div>
                {world.managers.pallier.filter( manager => !manager.unlocked).map(manager =>
                    <div key={manager.idcible} className="managergrid">
                        <div>
                            <div>
                                <img alt="manager logo" className="logo" src= {services.server + manager.logo} />
                            </div>
                        </div>
                        <div className="infosmanager">
                            <div className="managername"> { manager.name} </div>
                            <div className="managercible"> Gère la vente de {world.products.product.find(produit => produit.id == manager.idcible)?.name } </div>
                            <div className="managercost"> Coût : { manager.seuil} </div>
                        </div>
                        <div onClick={() => hireManager(manager)}>
                            <button className="buybutton" disabled={world.money < manager.seuil}>Enroler !</button>
                        </div>
                    </div>)
                }
                <button onClick={hideManagers} className="closebutton" >Fermer</button>
            </div>
        </div>
    )
}