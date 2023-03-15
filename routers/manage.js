const express = require("express");
const router = express.Router();
const connection = require("../database/connect.js").connection;
const { get_ip } = require("../utils/get_ip.js");

router.get("/manage", async(req, res) =>{
    connection.execute('SELECT * FROM auth WHERE ip= ?', [await get_ip(req)], async(err, results, fields) =>{
        if(results.length === 0){
            return res.redirect("/");
        }

        res.render("index.ejs", {
            page: "manage",
            platform: req.useragent,
            error: null,
            data: {
                auth: await auth_check(req),
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


router.post("/api/debtor/add", async(req, res) =>{
    connection.execute('SELECT * FROM auth WHERE ip= ?', [await get_ip(req)], async(err, results, fields) =>{
        if(results.length === 0){
            return res.redirect("/");
        }

        const { name, amount, date, description } = req.body ?? {};
        if(!name || !amount || !date || !description) return res.redirect("/manage");

        try {
            connection.execute('INSERT INTO dear_debtor(name,amount,date,description) VALUES(?,?,?,?)', [name, amount, date, description], async(err, results, fields) =>{
                if(!err) return res.redirect("/manage");
            });
        }
        catch(e){}
    });
});

router.post("/api/debtor/remove", async(req, res) =>{
    connection.execute('SELECT * FROM auth WHERE ip= ?', [await get_ip(req)], async(err, results, fields) =>{
        if(results.length === 0){
            return res.redirect("/");
        }

        const { id } = req.body ?? {};
        if(!id) return res.redirect("/manage");

        const id_array = id.trim().split(/ +/g);
    
        id_array.forEach(i => {
            try{
                connection.execute('DELETE FROM dear_debtor WHERE id= ?', [parseInt(i)], async(err, results, fields) =>{});
            }
            catch(e){}
        });
        res.redirect("/manage");
    });
});


module.exports = router;