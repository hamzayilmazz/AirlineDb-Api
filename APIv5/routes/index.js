'use strict';
var express = require('express');
var router = express.Router();
var sql = require("mssql");
var dbConfig = require('../DB/dbConnection');
/* Get All */
router.get('/All', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("select c.*,f.Type_flag,f.Classic_Plus_award,f.Elite_award,f.Elite_Plus_award from CUSTOMER c left join FFC f on c.Customer_id=f.Customer_id;");
    }).then(result => {
        res.send(result.recordset);
    }).catch(err => {
        res.status(500).send("Database bağlantı hatası");
    })
});
/* Get Anasayfa Bilgileri */
router.get('/Home', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("exec hamzaProcedure;");
    }).then(result => {
        res.send(result.recordset);
    }).catch(err => {
        res.status(500).send("Database bağlantı hatası");
    })
});
/* Get Customer */
router.get('/Customer/:ID', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("select c.*,f.Type_flag,f.Classic_Plus_award,f.Elite_award,f.Elite_Plus_award from CUSTOMER c left join FFC f on c.Customer_id=f.Customer_id WHERE c.Customer_id = " + req.params.ID);
    }).then(result => {
        res.send(result.recordset);
    }).catch(err => {
        res.status(500).send("Database bağlantı hatası");
    })
});
/* Add  */
router.post('/Add', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("insert into CUSTOMER values(" + req.body.Passaport_number + ",'" + req.body.Customer_name + "','" + req.body.Customer_phone + "','" + req.body.Country + "','" + req.body.E_mail + "','" + req.body.Adress + "'," + req.body.Total_miles + ")");
       
    }).then(result => {
        res.status(200).send("Customer başarıyla eklendi");
    }).catch(err => {
        res.status(415).send("Database bağlantı hatası");
    })
});
/* Delete  */
router.get('/Delete/:ID', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("DELETE FROM CUSTOMER WHERE Customer_id = " + req.params.ID);
    }).then(result => {
        res.status(200).send("Customer başarıyla silindi.");
    }).catch(err => {
        res.status(500).send("Database bağlantı hatası", err);
    })
});
/* Edit  */
router.post('/Edit/:ID', function (req, res) {
    sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query("UPDATE CUSTOMER SET Passaport_number=" + req.body.Passaport_number + ", Customer_name='" + req.body.Customer_name + "', Customer_phone='" + req.body.Customer_phone + "', Country='" + req.body.Country + "', E_mail='" + req.body.E_mail + "',Adress='" + req.body.Adress + "',Total_miles='" + req.body.Total_miles + "' where Customer_id=" + req.params.ID);
    }).then(result => {
        res.status(200).send("Customer başarıyla güncellendi");
    }).catch(err => {
        res.status(415).send("Database bağlantı hatası");
    })
});
module.exports = router;