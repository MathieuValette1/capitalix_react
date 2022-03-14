import { useState } from "react"
import { Services } from "../service"
import { Pallier, World } from "../world"
import '../css/Modale.css'
import logoSanglier from '../images/sanglier.png'



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
                <h1 className="title">Sangliers</h1>
                <h2 className="soustitre">Chasse les sangliers débloqués et gagne un bonus de 2% par sanglier sur tes revenus. Attention, ta partie reprendra à zéro.</h2>
                <img className="logoSanglier" src={logoSanglier}></img>
                <div className="angelgrid">
                    <div>Sangliers totaux: {world.totalangels}</div>
                    <div>Sangliers actifs: {world.activeangels}</div>
                    <div>Sangliers accumulés: {150*Math.sqrt(world.score/Math.pow(10,15))-world.totalangels}</div>
                </div>
                <button onClick={onWorldReset} id="deletebutton" type="button">Chasser le sanglier</button>
            </div>
        </div>
    )
}