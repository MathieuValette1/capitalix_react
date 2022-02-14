import logo from './logo.svg';
import './App.css';
import {Services} from "./Services.ts";
import {useEffect, useState} from "react";
import {World} from "./world.ts";


function App() {

  const [services, setServices] = useState(new Services(""))
  const [world, setWorld] = useState(new World())

  useEffect(() => {

    let services = new Services("")
    setServices(services)
    services.getWorld().then(response => {
          setWorld(response.data)
        }
    )
  }, [])


  return (
    <div className="App">
      <div className="header">
        <div> logo monde</div>
        <div> argent</div>
        <div> multiplicateur</div>
        <div> ID du joueur</div>
      </div>
      <div className="main">
        <div> liste des boutons de menu</div>
        <div className="product">
          <div> premier produit</div>
          <div> second produit</div>
          <div> troisième produit</div>
          <div> quatrième produit</div>
          <div> cinquième produit</div>
          <div> sixième produit</div>
        </div>
      </div>
    </div>
  );
}

export default App;
