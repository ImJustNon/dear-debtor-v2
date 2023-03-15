module.exports = {
    database: {
        mysql: {
            host: 'us-east.connect.psdb.cloud',                                     
            user: '615wwoqyj7wotlf60dzn',     
            password: "pscale_pw_2UjUScPZH3AyISe3YWbNhVcdzW0D4kEwfHX7uwpCPVK",                                     
            port: 3306,                                             
            database: 'myfirstdatabase',            
            ssl: {
                rejectUnauthorized: true
            },                               
                                 
        },
    },
    server: {
        address: "127.0.0.1",
        port: 8080,
    },
}