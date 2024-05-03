import { db } from "../connect.js";
import moment from "moment";
import jwt from "jsonwebtoken"

export const getcomments = (req,res)=>{
    const q = "select c.* , u.id as userid , name , profilepic from comments as c join users as u on (u.id = c.userid) where c.postid = ? order by c.createdat desc";
    // console.log("hii");

    
    db.query(q,[req.query.postid],(err,data)=>{
        if(err) return res.status(404).json(err)
        return res.status(200).json(data)
    })
}
export const addcomments = (req,res)=>{
        const q = "insert into comments ( `description` , `userid` , `postid`,`createdat` ) values (?)";
    // console.log("hii");
    const token = req.cookies.accesstoken;
    if(!token) return res.status(401).json("Not logged in");
    jwt.verify(token,"screatekeybsdk",(err,userinfo)=>{
        if(err) return res.status(403).json("User token not verified");


    console.log(req.body);
    const values = [
        req.body.desc,
        userinfo.id,
        req.body.postid,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.status(404).json(err)
        return res.status(200).json("comments has been created")
    })
    })} 