import { useState } from "react"
import { Services } from "./service"
import { Pallier, Product, World } from "./world"
import './Modale.css'


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
    }
    function showNext(): void{
        setShowNext(true);
        setShowGalerie(false);
    }

    function nextUnlock(produit: Product){
        const qte=produit.quantite;
        const nextUnlock = produit.palliers.pallier.filter(echelon => !echelon.unlocked);
        
        return(
            <div key={nextUnlock.at(0)?.idcible} className="unlock">
                <div>{nextUnlock.at(0)?.name}</div>
                <img alt="unlock logo" className="unlocklogo" src= {services.server + nextUnlock.at(0)?.logo} />
                <div className="managercost"> { nextUnlock.at(0)?.seuil} </div>
                {/* <div className="managercible"> {world.products.product[nextUnlock.at(0).idcible-1].name } </div> */}
            </div>
        )
    }

    return (
        <div className="modal">
            <div>
                <h1 className="title">Echelonix</h1>
                <h2 className="soustitre">Passe autant d'échelons que possible et maximise tes profits !</h2>
            </div>
            <div>
                <button onClick={showNext} className="buttonnext">Prochains échelonix</button>
                <button onClick={showGalerie} className="buttongalerie">Galerie</button>
            </div>
            <div id="nextunlocks"> {afficheNext &&
                <div className="unlocksgrid">{world.products.product.map(produit => nextUnlock(produit))}</div>
            }</div>
            <div id="galerie"> {afficheGalerie &&
                <div className="unlocksgrid">{world.allunlocks.pallier.map(unlock =>
                    <div key={unlock.idcible} className="unlock">
                        <div className="infosmanager">
                            <div className="managername"> { unlock.name} </div>
                            <img alt="unlock logo" className="unlocklogo" src= {services.server + unlock.logo} />
                            <div className="managercost"> { unlock.seuil} </div>
                            <div className="managercible"> {world.products.product[unlock.idcible-1].name } </div>
                        </div>
                    </div>)
                }</div>
            }</div>
            <button onClick={hideUnlocks} className="closebutton" >Fermer</button>
        </div>
    )
}