export class UserModel{

    username:string;
    password:string;
    role:string;
    phone:string;

    constructor(username:string,password:string,role:string,phone:string){
        this.username=username;
        this.password=password;
        this.role=role;
        this.phone=phone;

    }

}