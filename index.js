const {application, response} = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port,function() {
    console.log("Sever is running...");
})

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'db4free',
    user: 'vietanh_t2204m',
    password: 'loitiroi1',
    database: 'vietanh_t2204m',
    port: 3306
});



app.get("/",function(req,res){
    res.send("Hello, world!");
})

app.get("/bong-da",function(req,res){
    res.send("<h1>Bóng đá 24h</h1>");   
})
//api: danh sach category
app.get("/category",function(req,res){
    const sql_txt = "SELECT * FROM category";
    conn.query(sql_txt,function(err,data){
        if(err) res.send("Error");
        else res.send(data);
    })
})
app.get("/product",function(req,res){   
    const sql_txt = "SELECT * FROM product";
    conn.query(sql_txt,function(err,data){
        if(err) res.send("Error");
        else res.send(data);
    })
})
app.get("/thongke",function(req,res){
    const sql_txt = "SELECT count(id),categoryId FROM product group by categoryId ";
    conn.query(sql_txt,function(err,data){
        if(err) res.send("Error");
        else res.send(data);
    })
})

//lọc
app.get("/api-product-by-category",function (req,res) {
    const categoryId = req.query.categoryId;
    const sql_txt = "select * from product where categoryId = "+categoryId;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
});
//tìm kiếm 
app.get("/search-product",function (req,res) {
    const q = req.query.q;
    const sql_txt = `select * from product where name like '%${q}%'`;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
})
//xem chi tiết sp
app.get("/detail-product",function (req,res) {
    const id = req.query.id;
    const sql_txt = "select * from product where id = "+id;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else if(data.length ==0)
                res.send("404 not found");
        else
            res.send(data[0]);
    })
})

