export class Services {
    server = "http://localhost:8080/"
    api = this.server + "adventureisis/generic";
    user = "";
    constructor(user: string) {
        this.user = user
    }
}
