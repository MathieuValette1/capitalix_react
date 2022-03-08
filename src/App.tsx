import logo from './logo.svg';
import './App.css';
import { Services } from './service';
import { World } from './world';
import Product from './Product';
import { useState, useEffect } from 'react';

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
    return (
        <div className="App">
            <div className="header">
                <div> <img id="logoMonde" src={services.server + world.logo} alt={"logo.png"}/><span> {world.name} </span></div>
                <div> {world.money} </div>
                <div> multiplicateur </div>
                <div> ID du joueur </div>
            </div>
            <div className="main">
                <div> liste des boutons de menu </div>
            <div className="product">
                <div> <Product prod={ world.products.product[0] } services={ services }/>premier produit </div>
                <div> <Product prod={ world.products.product[1] } services={ services }/>second produit </div>
                <div> <Product prod={ world.products.product[2] } services={ services }/>troisième produit </div>
                <div> <Product prod={ world.products.product[3] } services={ services }/>quatrième produit </div>
                <div> <Product prod={ world.products.product[4] } services={ services }/>cinquième produit </div>
                <div> <Product prod={ world.products.product[5] } services={ services }/>sixième produit </div>
            </div>
            </div>
        </div>
    );
}

export default App;
