const axios = require('axios');

module.exports = {
    get_ip: async(req) =>{
        let request = await axios.get("https://api64.ipify.org/?format=json");  // (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        return request.data.ip;
    },
}