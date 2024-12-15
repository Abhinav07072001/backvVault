var users= [];
export default class UserModel{
    constructor(id, name, email, password){
        this.id= id;
        this.name= name;
        this.email= email;
        this.password= password;
    }
    // Post register 
    static add(name, email, password){
        const newUser =new UserModel(
            users.length + 1,
            name,
            email,
            password
        );
        users.push(newUser);
    }

    //post login
    static isValidUser(email, password){
        const result= users.find((u)=>
        u.email==email && u.password==password
    );
    return result;
    }


}
