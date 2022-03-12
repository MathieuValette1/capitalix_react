import logo from './logo.svg';
import '../css/App.css';
import { Services } from '../service';
import { Product, World } from '../world';
import ProductComponent from './Product';
import { useState, useEffect} from 'react';
import {transform} from "../utils";
import ManagerModal from './ManagerModal';
import Unlocks from './Unlocks';
import Upgrades from './Upgrades';
import Angels from './Angels';

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
        let input = document.getElementById("usernameInput")
        // @ts-ignore
        if (input.textContent != "") {
            // @ts-ignore
            let new_username = input.textContent
            // @ts-ignore
            input.value = new_username
            // @ts-ignore
            setUsername(new_username)

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
        let gain = p.revenu * p.quantite
        // ajout de la somme à l’argent possédé
        console.log("Gain")
        console.log(gain)
        addToScore(gain)
        updateMoney(gain)
        // services.putProduct(p)
    }

    function onProductBuy(cost:number, product:Product):void{
        updateMoney(-cost)
        /// On transmet toutes ces modifs au serveur
        services.putProduct(product)
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


    return (
        <div className="App">
            <div className="header">
                <div> <img id="logoMonde" src={services.server + world.logo} alt={"logo.png"}/><span id="worldName"> {world.name} </span></div>
                <span dangerouslySetInnerHTML={{__html: transform(world.money)}}/>
                <div> <button id="commutateurButton" onClick={changeCommutator} type="button">x1</button></div>
                <div> Username <input type="text" id="usernameInput"
                                      value={username}
                                      onChange={onUserNameChanged}/></div>

                <span dangerouslySetInnerHTML={{__html: transform(world.score)}}/>

            </div>
            <div className="main">
                <div>
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
                                      services={ services }
                                      onProductionDone={onProductionDone}
                                      onProductBuy={onProductBuy}
                                      qtmulti = {qtmulti}
                                      worldMoney = {world.money}
                    />
                    )}
                </div>
                <div className='modale'> { showManagers &&
                    <div className='managers'>
                        <ManagerModal world={world}
                                services={services}
                                afficheManagers={afficheManagers}
                                hideManagers={hideManagers}
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
                                />
                    </div>
                } </div>
                <div className='modale'> { showAngels &&
                    <div className='angels'>
                        <Angels world={world}
                                services={services}
                                afficheAngels={afficheAngels}
                                hideAngels={hideAngels}
                                />
                    </div>
                } </div>
            </div>
        </div>

    );
}

// @ts-ignore
export default App;
