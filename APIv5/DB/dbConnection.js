exports.dbConnection = function () {
    var dbConfig = {
        user: "sa", // SQL Server Login
        password: "123", // SQL Server Password
        server: "DESKTOP-2BS995L", // SQL Server Server name
        database: "projev4", // SQL Server Database name
        poer: 1433
    };
    return dbConfig;
};