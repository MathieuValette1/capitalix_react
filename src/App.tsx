import logo from './logo.svg';
import './App.css';
import { Services } from './service';
import { Product, World } from './world';
import ProductComponent from './Product';
import { useState, useEffect, useRef } from 'react';
import {transform} from "./utils";
import Manager from './Manager';

function App() {
    const [services, setServices] = useState(new Services(""))
    const [world, setWorld] = useState(new World())
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
        addToScore(gain)
    }

    function addToScore(gain: number): void{
        console.log("Score ")
        console.log(world.score)
        world.score += gain
    }

    function afficheManager(){
        
    }


    return (
        <div className="App">
            <img className="backgroundImg" src=''></img>
            <div className="header">
                <div> <img id="logoMonde" src={services.server + world.logo} alt={"logo.png"}/><span id="worldName"> {world.name} </span></div>
                <span dangerouslySetInnerHTML={{__html: transform(world.money)}}/>
                <div> <button type="button">multiplicateur</button></div>
                <div> ID du joueur </div>
                <span dangerouslySetInnerHTML={{__html: transform(world.score)}}/>

            </div>
            <div className="main">
                <div>
                    <nav><ul>
                        <li>My World</li>
                        <li>Unlocks</li>
                        <li onClick={afficheManager}>Managers</li>
                        <li>Upgrades</li>
                        <li>Angels</li>
                    </ul></nav>
                </div>
                <div className="products">
                    {world.products.product.map( p =>
                        <ProductComponent prod={ p } services={ services }  onProductionDone={onProductionDone}/>
                    )}
                </div>
                <div className='managers'>
                    <Manager world={world} services={services}/>
                </div>
            </div>
        </div>
    );
}

export default App;
