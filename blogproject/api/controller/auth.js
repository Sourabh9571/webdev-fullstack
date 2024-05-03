import { db } from '../connect.js'
import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';

export function register(req,res) {
    //if user exists 
    const q = "SELECT * FROM users Where username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exist");

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(req.body.password,salt);

        const q = "Insert into users (`username`,`email`,`password`,`name`) values(?)"
        const values = [
            req.body.username,
            req.body.email,
            hashpassword,
            req.body.name
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("user has been created");
        });
    }); 
}
export function login(req,res){
    const q = "SELECT * FROM users Where username = ?";
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length===0){
            return res.status(404).json("user not exists");
        }
        const checkpass = bcrypt.compareSync(req.body.password,data[0].password);
        if(!checkpass) return res.status(400).json("Wrong password or username");
        
        const token = jwt.sign({
            id:data[0].id 
        },"screatekeybsdk");

        const { password , ...others } = data[0];

        res.cookie("accesstoken",token,{
            httpOnly:true,
        }).status(200).json(others);
    });
}
export function logout(req,res){
    res.clearCookie("accesstoken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logout");
}