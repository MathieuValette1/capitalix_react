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

    const [afficheCashUpgrades, setShowCash] = useState(true);
    const [afficheAngelUpgrades, setShowAngel] = useState(false);

    function showCashUpgrades(): void{
        setShowCash(true);
        setShowAngel(false);
    }
    function showAngelUpgrades(): void{
        setShowAngel(true);
        setShowCash(false);
    }

    return (
        <div className="modal">
            <button onClick={hideUpgrades} className="closebutton" >&#x2718;</button>
            <div>
                <h1 className="title">Améliorationix</h1>
                <h2 className="soustitre">Achète des améliorations et augmente plus encore tes profix !</h2>
            </div>
            <div>
                <button onClick={showCashUpgrades} className="unlockbutton" id="buttoncashupgrades">cash</button>
                <button onClick={showAngelUpgrades} className="unlockbutton" id="buttonangelupgrades">sangliers</button>
            </div>
            <div className="sousmodale" id="cashUpgrades">{afficheCashUpgrades &&
                <div>
                    {world.upgrades.pallier.filter(cashupgrade => !cashupgrade.unlocked).map(cashupgrade =>
                        <UpgradeComponent upgrade= {cashupgrade}
                                        services={ services }
                                        world ={world}
                                        onUpgradeBuy = {onUpgradeBuy}
                        />
                    )}
                </div>
            }</div>
            <div className="sousmodale" id="angelUpgrades">{afficheAngelUpgrades &&
                <div>
                    {world.angelupgrades.pallier.filter(angelupgrade => !angelupgrade.unlocked).map(angelupgrade =>
                        <UpgradeComponent upgrade= {angelupgrade}
                                        services={ services }
                                        world ={world}
                                        onUpgradeBuy = {onUpgradeBuy}
                        />
                    )}
                </div>
            }</div>
        </div>
    )
}