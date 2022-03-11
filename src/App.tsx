import logo from './logo.svg';
import './App.css';
import { Services } from './service';
import { Product, World } from './world';
import ProductComponent from './Product';
import { useState, useEffect} from 'react';
import {transform} from "./utils";
import Manager from './Manager';

function App() {
    const [services, setServices] = useState(new Services(""))
    const [world, setWorld] = useState(new World())
    const [qtmulti, setQtMulti] = useState(1)
    const [showManagers, setShow] = useState(false)

    const username = ""
    useEffect(() => {

        let services = new Services(username)
        setServices(services)
        services.getWorld().then(response => {
                setWorld(response.data)
            }
        )

    }, [])

    function onProductionDone(p: Product): void {
        // calcul de la somme obtenue par la production du produit
        let gain = p.revenu
        // ajout de la somme à l’argent possédé
        console.log("Gain")
        console.log(gain)
        addToScore(gain)
    }

    function addToScore(gain: number): void {
        console.log("Score ")
        console.log(world.score)
        console.log(world.money)
        world.money += gain
        console.log(world.money)
        world.score += gain
    }
    
    function afficheManagers(): void{
        setShow(!showManagers);
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
                <div> ID du joueur </div>
                <span dangerouslySetInnerHTML={{__html: transform(world.score)}}/>

            </div>
            <div className="main">
                <div>
                    <nav><ul>
                        <li>My World</li>
                        <li>Unlocks</li>
                        <li onClick={afficheManagers}>Managers</li>
                        <li>Upgrades</li>
                        <li>Angels</li>
                    </ul></nav>
                </div>

            <div className="products">
                {world.products.product.map( p =>
                    <ProductComponent prod={ p }
                                      services={ services }
                                      onProductionDone={onProductionDone}
                                      qtmulti = {qtmulti}
                                      worldMoney = {world.money}
                    />
                    )}
                </div>
                <div> { showManagers &&
                    <div className='managers'>
                        <Manager world={world}
                                services={services}
                                afficheManagers={afficheManagers}
                                />
                    </div>
                } </div>
            </div>
        </div>
    );
}

export default App;
