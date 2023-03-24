
module.exports = {
    database: {
        mysql: {
            host: process.env.MYSQL_HOST || "",                                     
            user: process.env.MYSQL_USER || "",     
            password: process.env.MYSQL_PASSWORD || "",                                     
            port: 3306,                                             
            database: process.env.MYSQL_DATABASE || "",            
            ssl: {
                rejectUnauthorized: true,
            },                               
                                 
        },
    },
    server: {
        address: "127.0.0.1",
        port: 8080,
    },
}