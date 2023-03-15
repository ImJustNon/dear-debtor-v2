const express = require("express");
const router = express.Router();
const connection = require("../database/connect.js").connection;
const { get_ip } = require("../utils/get_ip.js");

router.get("/logout", async(req, res) =>{
    connection.execute('SELECT * FROM auth WHERE ip= ?', [await get_ip(req)], async(err, results, fields) =>{
        if(results.length === 0){
            return res.redirect("/");
        }

        connection.execute('TRUNCATE TABLE auth', (err) =>{
            if(!err){
                return res.redirect("/");
            }
        });
    });
});

module.exports = router;