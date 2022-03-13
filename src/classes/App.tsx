import logo from './logo.svg';
import '../css/App.css';
import { Services } from '../service';
import {Pallier, Product, World } from '../world';
import ProductComponent from './Product';
import { useState, useEffect} from 'react';
import {transform} from "../utils";
import ManagerModal from './ManagerModal';
import Unlocks from './Unlocks';
import Upgrades from './Upgrades';
import Angels from './Angels';
import { forEachLeadingCommentRange } from 'typescript';
import logoMonnaie from '../images/monnaie.png'

function App() {
    const [services, setServices] = useState(new Services(""))
    const [world, setWorld] = useState(new World())
    const [qtmulti, setQtMulti] = useState(1)
    const [showManagers, setShowManagers] = useState(false)
    const [showUnlocks, setShowUnlocks] = useState(false)
    const [showUpgrades, setShowUpgrades] = useState(false)
    const [showAngels, setShowAngels] = useState(false)

    const [username, setUsername] = useState("")

    function onUserNameChanged(){
        // @ts-ignore
        let username = document.getElementById("usernameInput").value
        if (username!=""){
            localStorage.setItem("username", username);
            setUsername(username)
        }
    }
    useEffect(() => {
        if (username !== "") {
            let services = new Services(username)
            setServices(services)
            services.getWorld().then(response => {
                    // let liste = compute_unlocks_list(response.data)
                    setWorld(response.data)
                    // setUnlockList(liste)
                }
            )
        }
    }, [username])
    useEffect(() => {
        let username = localStorage.getItem("username");
        // si pas de username, on génère un username aléatoire
        if (!username || username === "") {
            username = "Captain" + Math.floor(Math.random() * 10000);
        }
        localStorage.setItem("username", username);
        setUsername(username)
    }, [])

    function onProductionDone(p: Product): void {
        // calcul de la somme obtenue par la production du produit
        let gain = p.revenu * p.quantite * (1+world.activeangels*world.angelbonus/100)
        // ajout de la somme à l’argent possédé
        // console.log("Gain")
        // console.log(gain)
        addToScore(gain)
        updateMoney(gain)
        services.putProduct(p)
    }

    function onProductBuy(cost:number, product:Product):void{
        updateMoney(-cost)
        /// On transmet toutes ces modifs au serveur
        services.putProduct(product)
    }

    function  onManagerBuy(seuil:number, manager:Pallier):void{
        console.log("Manager acheté")
        updateMoney(-seuil)
        services.putManager(manager)
    }

    function onUpgradeBuy(seuil:number, upgrade:Pallier):void{
        console.log("Upgrade acheté")
        updateMoney(-seuil)
        services.putUpgrade(upgrade)
    }

    function onWorldReset():void{
        services.deleteWorld()
        // window.location.reload() // Je l'ai commenté parce que le reload se fait avant le delete, et le monde ne se reset pas
        setTimeout(() => window.location.reload(), 500)
    }

    function updateMoney(gain:number){
        /// Met à jour l'argent du joueur de manière positive (revenu gain positif) ou négative (achat gain négatif)
        setWorld(world => ({...world, money:world.money + gain}))
    }

    function addToScore(gain: number): void {
        /// Met à jour le score du joueur
        setWorld(world => ({...world, score:world.score + gain}))
    }

    function hideAllModal(): void {
        hideManagers();
        hideUnlocks();
        hideUpgrades();
        hideAngels();
    }

    function afficheManagers(): void{
        hideAllModal();
        setShowManagers(true);
    }
    function hideManagers(): void{
        setShowManagers(false);
    }

    function afficheUnlocks(): void{
        hideAllModal();
        setShowUnlocks(true);
    }
    function hideUnlocks(): void{
        setShowUnlocks(false);
    }

    function afficheUpgrades(): void{
        hideAllModal();
        setShowUpgrades(true);
    }
    function hideUpgrades(): void{
        setShowUpgrades(false);
    }

    function afficheAngels(): void{
        hideAllModal();
        setShowAngels(true);
    }
    function hideAngels(): void{
        setShowAngels(false);
    }

    function changeCommutator():void{
        /// Fonction permettant de changer l'affichage du bouton commutateur dans cet ordre:
        /// x1 -> x10 -> x100 -> xMax -> x1 etc...
        let button = document.getElementById("commutateurButton")
        if (button) {
            if (button.textContent === "x1") {
                button.textContent = "x10"
                setQtMulti(10)
            }
            else if (button.textContent === "x10"){
                button.textContent = "x100"
                setQtMulti(100)
            }
            else if (button.textContent === "x100"){
                button.textContent = "xMax"
                setQtMulti(-1)
            }
            else{
                button.textContent = "x1"
                setQtMulti(1)
            }
        }
    }

    function checkAllUnlocks(seuil: number){
        let unlocked = true;
        world.products.product.map(produit => 
            produit.palliers.pallier.map(echelon => 
                {
                    if(echelon.seuil == seuil){
                        if(!echelon.unlocked){
                            unlocked = false;
                        }
                    }
                }
            )
        )
        if(unlocked){
            let allunlock = world.allunlocks.pallier.find(allunlock => allunlock.seuil == seuil);
            if(allunlock != null){
                freeAllUnlock(allunlock);
            }
        }
    }

    function freeAllUnlock(allunlock: Pallier){
        allunlock.unlocked = true;
        world.products.product.map(prod =>
            {    
                if (allunlock.typeratio=="VITESSE"){
                    
                    prod.vitesse = prod.vitesse / allunlock.ratio
                    prod.progressbarvalue = prod.progressbarvalue / allunlock.ratio
                    prod.timeleft = prod.timeleft / 2
                    //setProgress(prod.progressbarvalue)
                    console.log("VITESSE de " + prod.name + " divisé par " + allunlock.ratio)
                }
                else if (allunlock.typeratio == "GAIN"){
                    prod.revenu = prod.revenu * allunlock.ratio
                    console.log("REVENU de " + prod.name + " multiplié par " + allunlock.ratio)
                }
            }
        )
    }

    return (
        <div className="App">
            <div className="header">
                <div> <img id="logoMonde" src={services.server + world.logo} alt={"logo.png"}/><span id="worldName"> {world.name} </span></div>
                <div>
                    <img className='logomonnaie' alt='logo monnaie' src={logoMonnaie}></img>
                    <span>{transform(world.money)}</span>
                </div>
                <div> <button id="commutateurButton" onClick={changeCommutator} type="button">x1</button></div>
                <div> Username <input type="text" id="usernameInput"
                                      value={username}
                                      onChange={onUserNameChanged}/>
                </div>
                <span dangerouslySetInnerHTML={{__html: transform(world.score)}}/>
            </div>
            <div className="main">
                <div className='menu'>
                    <nav><ul>
                        <li onClick={afficheUnlocks}>Echelonix</li>
                        <li onClick={afficheManagers}>Directrix</li>
                        <li onClick={afficheUpgrades}>Améliorationix</li>
                        <li onClick={afficheAngels}>Sangliers</li>
                    </ul></nav>
                </div>

                <div className="products">
                    {world.products.product.map( p =>
                        <ProductComponent prod={ p }
                                        world = {world}
                                        services={ services }
                                        onProductionDone={onProductionDone}
                                        onProductBuy={onProductBuy}
                                        qtmulti = {qtmulti}
                                        worldMoney = {world.money}
                                        checkAllUnlocks = {checkAllUnlocks}
                        />
                    )}
                </div>
                <div className='modale'> { showManagers &&
                    <div className='managers'>
                        <ManagerModal world={world}
                                      services={services}
                                      afficheManagers={afficheManagers}
                                      hideManagers={hideManagers}
                                      onManagerBuy={onManagerBuy}
                                />
                    </div>
                } </div>
                <div className='modale'> { showUnlocks &&
                    <div className='unlocks'>
                        <Unlocks world={world}
                                services={services}
                                afficheUnlocks={afficheUnlocks}
                                hideUnlocks={hideUnlocks}
                                />
                    </div>
                } </div>
                <div className='modale'> { showUpgrades &&
                    <div className='upgrades'>
                        <Upgrades world={world}
                                  services={services}
                                  afficheUpgrades={afficheUpgrades}
                                  hideUpgrades={hideUpgrades}
                                  onUpgradeBuy = {onUpgradeBuy}
                                />
                    </div>
                } </div>
                <div className='modale'> { showAngels &&
                    <div className='angels'>
                        <Angels world={world}
                                services={services}
                                afficheAngels={afficheAngels}
                                hideAngels={hideAngels}
                                onWorldReset={onWorldReset}
                                />
                    </div>
                } </div>
            </div>
        </div>

    );
}

// @ts-ignore
export default App;
