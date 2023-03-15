const express = require("express");
const router = express.Router();
const connection = require("../database/connect.js").connection;
const { get_ip } = require("../utils/get_ip.js");

router.get("/login", async(req, res) =>{
    connection.execute('SELECT * FROM auth WHERE ip= ?', [await get_ip(req)], async(err, results, fields) =>{
        if(results.length > 0){
            return res.redirect("/");
        }

        res.render("index.ejs", {
            page: "login",
            platform: req.useragent,
            error: null,
            data: {
                auth: await auth_check(req)
            },  
        });
    });
});

async function auth_check(req){
    return new Promise(async(resolve, reject) => {
        let auth;
        connection.execute('SELECT * FROM auth WHERE ip= ?', [await get_ip(req)], async(err, results, fields) =>{
            if(results.length > 0){
                auth = true;
            } else {
                auth = false;
            }
            resolve(auth);
        });
    });
}

module.exports = router;