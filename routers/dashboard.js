const express = require("express");
const router = express.Router();
const connection = require("../database/connect.js").connection;
const { get_ip } = require("../utils/get_ip.js");

router.get("/", async(req, res) =>{

    let auth = await auth_check(req);

    connection.execute('SELECT * FROM dear_debtor', async(err, results, fields) =>{
        res.render("index.ejs", {
            page: "dashboard",
            platform: req.useragent,
            error: null,
            data: {
                debtor: await results,
                debtor_name_list: array_instersection(results),
                sum_amount: cal_all_amount(results),
                auth: auth,
            }
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


function array_instersection(result){
    let array = [];
    result.forEach(async(x) =>{
    array.push(x.name)
    });

    function eliminateDuplicates(arr) {
    var i,
        len = arr.length,
        out = [],
        obj = {};

    for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
    }
    for (i in obj) {
        out.push(i);
    }
    return out;
    }

    return eliminateDuplicates(array)
}

function cal_all_amount(result){
    let cal = 0;
    result.forEach((x) =>{
        cal = cal + parseFloat(x.amount);
    });
    return cal;
}

module.exports = router;