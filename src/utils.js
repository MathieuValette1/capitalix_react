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
        if (valeur<10000000) {
            res = valeur.toPrecision(4);
            res = res.replace(/e\+(.*)/, MILLION);
        }
        else if (valeur<100000000) {
            // res = valeur.toPrecision(2);
            res = valeur.toString()[0] + valeur.toString()[1]
            res = res + MILLION;
        }
        else{
            res = valeur.toString()[0] + valeur.toString()[1] + valeur.toString()[2]
            res = res + MILLION;
        }
    }
    else if (valeur >= 1000000000){
        if (valeur<10000000000) {
            res = valeur.toPrecision(4);
            res = res.replace(/e\+(.*)/, MILLIARD);
        }
        else if (valeur<100000000000) {
            // res = valeur.toPrecision(2);
            res = valeur.toString()[0] + valeur.toString()[1]
            res = res + MILLIARD;
        }
        else{
            res = valeur.toPrecision(4) + " ça fait beaucoup là non?"
        }
    }
    return res;
}
