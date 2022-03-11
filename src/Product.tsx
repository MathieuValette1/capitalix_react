import {useEffect, useRef, useState } from "react"
import { Services } from "./service"
import { Product, World } from "./world"
import ProgressBar from "./ProgressBar"
import './Product.css'

type ProductProps = {
    prod: Product
    onProductionDone: (product: Product) => void
    onProductBuy: (cost: number) => void
    services: Services
    qtmulti: number
    worldMoney: number
}
export default function ProductComponent({ prod, services, onProductionDone, onProductBuy, worldMoney, qtmulti }: ProductProps) {
    const [progress, setProgress] = useState(0)
    const [quantite, setQuantite] = useState(prod.quantite)
    const [cost, setCost] = useState(prod.cout)
    const [revenu, setRevenu] = useState(prod.revenu)
    calcMaxCanBuy()
    const savedCallback = useRef(calcScore)
    useEffect(() => savedCallback.current = calcScore)
    useEffect(() => {
        let timer = setInterval(() => savedCallback.current(), 100)
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])

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

    // function isBuyable():void{
    //     if (worldMoney > costOfNProduct(qtmulti)){
    //         setProdISBuyable
    //     }
    //     else{
    //         setProdISBuyable(false)
    //         return false
    //     }
    // }

    function calcMaxCanBuy(): void{
        /// Calcule le maximum de produit qui peut être acheté avec l'argent actuel
        let money = worldMoney
        let c = prod.croissance
        if (qtmulti == 1){
            qtmulti = 1
            // isBuyable()
        }
        else if (qtmulti == 10){
            qtmulti = 10
            // isBuyable()
        }
        else if (qtmulti == 100){
            qtmulti = 100
            // isBuyable()
        }
        else {
            let n = Math.round(Math.log(1 - money * (1 - c) / prod.cout) / Math.log(c))
            qtmulti = n
            // isBuyable()
        }
    }

    function costOfNProduct(n: number):number{
        /// Calcule le cout de n produits

        console.log(n)
        return prod.cout * (1 - Math.pow(prod.croissance, n))/ (1 - prod.croissance)

    }

    function buyProduct():void{
        /// Le joueur achète qte produits
        // On ajoute la quantité achetée à la quantité totale de produit et on met à jour l'affichage
        prod.quantite += qtmulti
        setQuantite(prod.quantite)
        /// On calcule le prix de l'achat et on l'envoie au composant parent
        let cost = costOfNProduct(qtmulti)
        onProductBuy(cost)
        // On calcule le nouveau prix et on met à jour l'affichage
        prod.cout = prod.cout*Math.pow(prod.croissance, qtmulti)
        setCost(prod.cout)
        // On calcule le nouveau revenu du produit et on met à jour l'affichage
        prod.revenu = prod.cout * prod.quantite
        setRevenu(prod.revenu)

        /// On transmet toutes ces modifs au serveur
        services.putProduct(prod)
    }

    return (
        <div className="product">
            <div className="productInfo">
                <img onClick={startFabrication} className="productLogo" src={services.server + prod.logo} alt={prod.logo}/>
                <div className="qte">Quantité: {quantite}</div>
            </div>
            <div className="revenu">Revenu: {revenu}</div>
            <div className="prixStand">
                <button type="button" onClick={buyProduct}>
                    x{qtmulti} Prix: {costOfNProduct(qtmulti)}
                </button>
            </div>
            <div className="temps">Temps: {prod.vitesse}s</div>
            <div className="progressBar">
                <ProgressBar transitionDuration={"0.1s"} customLabel={" "} completed={progress}/>
            </div>
        </div>
    )
}



