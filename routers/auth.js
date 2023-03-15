const express = require("express");
const router = express.Router();
const connection = require("../database/connect.js").connection;
const { get_ip } = require("../utils/get_ip.js");

router.get("/api/auth", (req, res) =>{
    const { username, password } = req.query ?? {};

    if(!username || !password){
        return res.redirect("/");
    }

    connection.execute('SELECT * FROM admin_user WHERE username= ? AND password= ?', [username, password], async(err, results, fields) =>{
        if(results.length === 0){
            return res.redirect("/");
        }

        connection.execute('INSERT INTO auth(username,ip,timestamp) VALUES(?,?,?)', [username, await get_ip(req), new Date().getTime()], async(err, results, fields) =>{
            console.log(`[Alert] Login success : ${username}`);
            res.redirect("/");
        });
    });
});

module.exports = router;