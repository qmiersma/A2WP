class A2WP {
    constructor({amilia, wp, targetPath, categories = null}) {
        this.amilia = amilia; 
        this.wp = wp; 
        this.amilia.url = "https://amilia-img-proxy.azurewebsites.net/api/GetAmilia"; 
        this.wp.url = "https://sbvpastg.wpenginepowered.com/wp-json/wp/v2/";
        this.targetPath = targetPath; 
        this.categories = categories; 
        this.customFuncs = []; 
    }

    // Checks if script is eligible to run
    checkRun() {
        let check = [false, false]; 
        const currentPath = window.location.pathname.split("/"); 
        const childMust = this.targetPath.includes("{path}"); 
        const childOptional = this.targetPath.includes("{path?}"); 

        //
    }

    async fetchTemplate() {

    }
}