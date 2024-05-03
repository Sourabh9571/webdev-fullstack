import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getposts = (req,res)=>{
    const token = req.cookies.accesstoken;
    if(!token) return res.status(401).json("Not logged in");
    jwt.verify(token,"screatekeybsdk",(err,userinfo)=>{
        if(err) return res.status(403).json("User token not verified");

        const q = "SELECT p.* , u.id as userid , name , profilepic from posts as p JOIN users as u ON (u.id = p.userid) left join relations as r on (p.userid = r.follwedid) where r.followid = ? or p.userid = ?";
    // console.log("hii");

    db.query(q,[userinfo.id , userinfo.id],(err,data)=>{
        if(err) return res.status(404).json(err)
        return res.status(200).json(data)
    })
    })
}
export const addpost = (req,res)=>{
    const token = req.cookies.accesstoken;
    if(!token) return res.status(401).json("Not logged in");
    jwt.verify(token,"screatekeybsdk",(err,userinfo)=>{
        if(err) return res.status(403).json("User token not verified");

        const q = "insert into posts ( `description` , `image` , `userid` ) values (?)";
    // console.log("hii");

    console.log(req.body);
    const values = [
        req.body.desc,
        req.body.image.fileName,
        userinfo.id
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.status(404).json(err)
        return res.status(200).json("post has been created")
    })
    })
}
