import { useState } from "react"
import { Services } from "../service"
import { Pallier, Product, World } from "../world"
import '../css/Modale.css'


type UnlocksProps = {
    world : World 
    services : Services
    afficheUnlocks(): void
    hideUnlocks(): void
}

export default function Angels({world, services, afficheUnlocks, hideUnlocks}: UnlocksProps){

    const [afficheGalerie, setShowGalerie] = useState(false);
    const [afficheNext, setShowNext] = useState(true);

    function showGalerie(): void{
        setShowGalerie(true);
        setShowNext(false);
    }// affichage de la div de galerie si bouton galerie cliqué
    function showNext(): void{
        setShowNext(true);
        setShowGalerie(false);
    }// affichage de la div des prochains unlocks à atteindre

    function nextUnlock(produit: Product){
        const nextUnlock = produit.palliers.pallier.filter(echelon => !echelon.unlocked);
        // récupération de tous les échelons pas encore débloqués pour un produit donné
        return(
            <div key={nextUnlock.at(0)?.idcible} className="unlock">
                <div>{nextUnlock.at(0)?.name}</div>
                <img alt="unlock logo" className="unlocklogo" src= {services.server + nextUnlock.at(0)?.logo} />
                <div className="unlockcost"> { nextUnlock.at(0)?.seuil} </div>
            </div>
        )// retourne les infos relatives au premier des échelons pas encore débloqués du produit
    }

    function nextAllUnlock(){
        const nextAllUnlock = world.allunlocks.pallier.filter(echelon => !echelon.unlocked);
        // récupération de tous les allunlocks pas encore débloqués
        return(
            <div key={nextAllUnlock.at(0)?.idcible} className="unlock">
                <div>{nextAllUnlock.at(0)?.name}</div>
                <img alt="allunlock logo" className="unlocklogo" src= {services.server + nextAllUnlock.at(0)?.logo} />
                <div className="allunlockcost"> { nextAllUnlock.at(0)?.seuil} </div>
            </div>
        )// retourne les infos relatives au premier des allunlocks pas encore débloqués
    }

    return (
        <div className="modal">
            <button onClick={hideUnlocks} className="closebutton" >&#x2718;</button>
            <div>
                <h1 className="title">Echelonix</h1>
                <h2 className="soustitre">Passe autant d'échelons que possible et maximise tes profits !</h2>
            </div>
            <div>
                <button onClick={showNext} className="buttonnext">Prochains échelonix</button>
                <button onClick={showGalerie} className="buttongalerie">Galerie</button>
            </div>
            <div className="sousmodale" id="nextunlocks"> {afficheNext &&
                <div className="unlocksgrid">
                    {world.products.product.map(produit => nextUnlock(produit))}
                    {nextAllUnlock()}
                </div>
            }</div>
            <div className="sousmodale" id="galerie"> {afficheGalerie &&
                <div className="unlockgrid">
                    <div>{world.products.product.map(produit =>
                        produit.palliers.pallier.map(unlock =>
                            <div key={unlock.idcible} className="unlock">
                                <div className="unlockname">{unlock.name}</div>
                                <img alt="unlock logo" className="unlocklogo" src= {services.server + unlock.logo} />
                                <div className="seuilunlock"> { unlock.seuil} </div>
                                <div className="produitcible"> {world.products.product[unlock.idcible-1].name } </div>
                            </div>
                        ))} 
                        {/* affichage des unlocks de produits */}
                        {world.allunlocks.pallier.map(unlock =>
                            <div key={unlock.idcible} className="unlock">
                                <div className="infosmanager">
                                    <div className="managername"> { unlock.name} </div>
                                    <img alt="unlock logo" className="unlocklogo" src= {services.server + unlock.logo} />
                                    <div className="seuilunlock"> { unlock.seuil} </div>
                                    <div className="produitcible"> all </div>
                                </div>
                            </div>)
                        }
                        {/* affichage des all unlocks */}
                    </div>
                </div>
            }</div>
        </div>
    )
}