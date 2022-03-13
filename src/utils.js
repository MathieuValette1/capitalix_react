export function transform(valeur: number): string {
    let res : string = "";
    let MILLION = " millions"
    let MILLIARD = " milliards"
    if (valeur < 1000)
        res = valeur.toFixed(2);
    else if (valeur < 1000000)
        /// entre 5000 et 1 million
        res = valeur.toFixed(0);
    else if (valeur < 1000000000) {
        // entre 1 million et 1 milliard
        res = valeur.toPrecision(4);
        res = res.replace(/e\+(.*)/, MILLION);
    }
    else if (valeur >= 1000000000){
        res = valeur.toPrecision(4);
        res = res.replace(/e\+(.*)/, MILLIARD);
    }
    return res;
}
