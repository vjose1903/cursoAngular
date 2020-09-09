import jwt from'jsonwebtoken'
export default class Token{
    
    private static semilla: string ='semilla-seed,privacityPorpia-FedeDj';
    private static caducidad: string ='1h';

    constructor(){
    }

    static gettoken(payload:any):string{
    
        return jwt.sign({
            usuario: payload
        }, this.semilla, {expiresIn: this.caducidad})
    }

    static compararToken(userToken:string){
        return new Promise((resolve, reject)=>{
            jwt.verify(userToken, this.semilla, (err, decoded)=>{
                if (err) {
                    reject();
                }else{
                    resolve(decoded)
                }
            })
        })
    }

}