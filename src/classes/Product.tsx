import {useEffect, useRef, useState } from "react"
import { Services } from "../service"
import { Product, World } from "../world"
import ProgressBar from "./ProgressBar"
import '../css/Product.css'
import { forEachLeadingCommentRange } from "typescript"

type ProductProps = {
    prod: Product
    world: World
    onProductionDone: (product: Product) => void
    onProductBuy: (cost: number, product:Product) => void
    services: Services
    qtmulti: number
    worldMoney: number
    checkAllUnlocks: (seuil : number) => void
}
export default function ProductComponent({ prod, world, services, onProductionDone, onProductBuy, worldMoney, qtmulti, checkAllUnlocks }: ProductProps) {
    const [progress, setProgress] = useState(((prod.vitesse - prod.timeleft) / prod.vitesse) * 100)
    const [quantite, setQuantite] = useState(prod.quantite)
    const [cost, setCost] = useState(prod.cout)
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
        if (prod.timeleft == 0){
            if (prod.quantite>0) {
                // console.log("Icone cliquée")
                // console.log(prod.name)
                prod.timeleft = prod.vitesse
                prod.lastupdate = Date.now()

            }}
    }

    function checkForNewUpgrade(){
        world.upgrades.pallier.map(upgrade =>{
            if (upgrade.idcible == prod.id){
                if (upgrade.unlocked){
                    /// L'upgrade a été débloqué on l'applique dans tous les cas (ratio = 1 si déjà appliqué)
                    if (upgrade.typeratio == "VITESSE"){
                        prod.vitesse = prod.vitesse / upgrade.ratio
                        prod.progressbarvalue = prod.progressbarvalue / upgrade.ratio
                        prod.timeleft = prod.timeleft / upgrade.ratio
                        setProgress(prod.progressbarvalue)
                        // console.log("VITESSE de " + prod.name + " divisé par " + upgrade.ratio)
                        upgrade.ratio = 1
                    }
                    else if (upgrade.typeratio == "GAIN"){
                        prod.revenu = prod.revenu * upgrade.ratio
                        console.log("REVENU de " + prod.name + " multiplié par " + upgrade.ratio)
                        upgrade.ratio = 1
                    }
                }
            }
            else if(upgrade.idcible ==0){
                if (upgrade.unlocked){
                /// C'est un upgrade s'appliquant sur tous les produits
                world.products.product.map(p => {
                    if (upgrade.typeratio == "VITESSE") {
                        p.vitesse = p.vitesse / upgrade.ratio
                        p.progressbarvalue = p.progressbarvalue / upgrade.ratio
                        p.timeleft = p.timeleft / upgrade.ratio
                        setProgress(p.progressbarvalue)
                        // console.log("VITESSE de " + prod.name + " divisé par " + upgrade.ratio)
                    } else if (upgrade.typeratio == "GAIN") {
                        p.revenu = p.revenu * upgrade.ratio
                        console.log("REVENU de " + prod.name + " multiplié par " + upgrade.ratio)
                    }
                })
                    upgrade.ratio = 1

                }
            }
        })
    }

    function calcScore(){
        checkForNewUpgrade()
        if (prod.timeleft == 0){
            // Le produit n'est pas en production
            //console.log(prod.name + " n'est pas en production")
            setProgress(0)
            if (prod.managerUnlocked){
                startFabrication()
            }
        }
        else{
            let time_since_last_update = Date.now() - prod.lastupdate
            prod.lastupdate = Date.now()
            //console.log('TIMELEFT: ', prod.timeleft)
            prod.timeleft -= time_since_last_update

            if(prod.timeleft<=0){
                prod.timeleft = 0
                let revenu = prod.revenu
                // Remettre la barre de progression à 0
                prod.progressbarvalue = 0
                onProductionDone(prod)
                calcMaxCanBuy()
                if (prod.managerUnlocked){
                    startFabrication()
                }
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
        if (qtmulti == 1){
            qtmulti = 1
        }
        else if (qtmulti == 10){
            qtmulti = 10
        }
        else if (qtmulti == 100){
            qtmulti = 100
        }
        else {
            let n = Math.floor(Math.log(1 - money * (1 - c) / prod.cout) / Math.log(c))
            qtmulti = n
        }
    }

    function costOfNProduct(n: number):number{
        /// Calcule le cout de n produits
        return prod.cout * (1 - Math.pow(prod.croissance, n))/ (1 - prod.croissance)

    }

    function buyProduct():void{
        /// Le joueur achète qte produits
        // On ajoute la quantité achetée à la quantité totale de produit et on met à jour l'affichage
        prod.quantite += qtmulti
        setQuantite(prod.quantite)
        // On vérifie si des unlocks ont été débloqués
        prod.palliers.pallier.filter(echelon => !echelon.unlocked).map(unlock =>
            {
                if(unlock.seuil <= prod.quantite){
                /// On vérifie que l'unlock n'a pas déjà été débloqué
                if (!unlock.unlocked){
                    console.log("On débloque " + unlock.name)
                    console.log(unlock.typeratio)
                    unlock.unlocked = true;
                    if (unlock.typeratio=="VITESSE"){
                        prod.vitesse = prod.vitesse / unlock.ratio
                        prod.progressbarvalue = prod.progressbarvalue / unlock.ratio
                        prod.timeleft = prod.timeleft / 2
                        setProgress(prod.progressbarvalue)
                        console.log("VITESSE de " + prod.name + " divisé par " + unlock.ratio)
                    }
                    else if (unlock.typeratio == "GAIN"){
                        prod.revenu = prod.revenu * unlock.ratio
                        console.log("REVENU de " + prod.name + " multiplié par " + unlock.ratio)
                    }

                    checkAllUnlocks(unlock.seuil);
                }
            }}
        )
        /// On calcule le prix de l'achat et on l'envoie au composant parent
        let cost = costOfNProduct(qtmulti)
        // On calcule le nouveau prix et on met à jour l'affichage
        prod.cout = prod.cout*Math.pow(prod.croissance, qtmulti)
        setCost(prod.cout)
        /// On transmet au parent
        onProductBuy(cost, prod)
    }

    return (
        <div className="product" key={prod.id}>
            <div className="productInfo">
                <img onClick={startFabrication} className="productLogo" src={services.server + prod.logo} alt={prod.logo}/>
                <div className="qte">Quantité: {quantite}</div>
            </div>
            <div className="revenu">Revenu: {prod.revenu * prod.quantite}</div>
            <div className="prixStand">
                <button type="button" onClick={buyProduct} disabled={worldMoney < costOfNProduct(qtmulti) || qtmulti==0}>
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



