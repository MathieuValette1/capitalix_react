import {useEffect, useRef, useState } from "react"
import { Services } from "./service"
import { Product, World } from "./world"
import ProgressBar from "./ProgressBar"
import './Product.css'

type ProductProps = {
    prod: Product
    onProductionDone: (product: Product) => void
    services: Services
    qtmulti: number
    worldMoney: number
}
export default function ProductComponent({ prod, services, onProductionDone, worldMoney, qtmulti }: ProductProps) {
    const [progress, setProgress] = useState(0)

    const savedCallback = useRef(calcScore)
    useEffect(() => savedCallback.current = calcScore)
    useEffect(() => {
        let timer = setInterval(() => savedCallback.current(), 100)
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])

    /// Si le bouton commutateur est sur xMax, on calcule la qte max achetable
    if (qtmulti != 1 && qtmulti != 10 && qtmulti != 100 ){
        console.log("on t'appelle")
        calcMaxCanBuy()
    }

    function startFabrication(){
        if (prod.quantite>0) {
            console.log("Icone cliquée")
            console.log(prod.name)
            prod.timeleft = prod.vitesse
            prod.lastupdate = Date.now()
        }
    }

    function calcScore(){
        if (prod.timeleft == 0){
            //console.log(prod.name + " n'est pas en production")
            setProgress(0)
        }
        else{
            let time_since_last_update = Date.now() - prod.lastupdate
            prod.lastupdate = Date.now()
            //console.log('TIMELEFT: ', prod.timeleft)
            prod.timeleft -= time_since_last_update

            if(prod.timeleft<=0){
                prod.timeleft = 0
                console.log(prod.name + " a été créé")
                let revenu = prod.revenu
                // Remettre la barre de progression à 0
                prod.progressbarvalue = 0
                onProductionDone(prod)
                calcMaxCanBuy()
            }
            else{
                //console.log("Production pas finie")
                // Faire progresser la ProgressBar
                prod.progressbarvalue = ((prod.vitesse - prod.timeleft) / prod.vitesse) * 100
                //console.log("Barre de progression: "+ progress + "%")
            }
            setProgress(prod.progressbarvalue)
        }
    }

    function calcMaxCanBuy(): void{
        /// Calcule le maximum de produit qui peut être acheté avec l'argent actuel
        let money = worldMoney
        let c = prod.croissance

        let n = Math.round(Math.log(1-money*(1-c)/prod.cout)/Math.log(c))

        qtmulti = n
    }

    return (
        <div className="product">
            <div className="productInfo">
                <img onClick={startFabrication} className="productLogo" src={services.server + prod.logo} alt={prod.logo}/>
                <div className="qte">Quantité: {prod.quantite}</div>
            </div>
            <div className="revenu">Revenu: {prod.revenu}</div>
            <div className="prixStand">
                <button type="button">x{qtmulti} Prix: {qtmulti * prod.cout} </button>
            </div>
            <div className="temps">Temps: {prod.vitesse}s</div>
            <div className="progressBar">
                <ProgressBar transitionDuration={"0.1s"} customLabel={" "} completed={progress}/>
            </div>
        </div>
    )
}



