const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('MD5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret')
const ip = require('ip')


exports.registrasi = function (req, res) {
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    let query = "SELECT email FROM ?? WHERE ??=?";
    let table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) {
                let query = "INSERT INTO ?? SET ?";
                let table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Berhassil menambahkan data user baru", res);
                    }
                })
            } else {
                response.ok("Email sudah terdaftar Oke", res)
            }
        }
    });
};

//controller untuk login
exports.login = function (req, res) {
    let post = {
        password: req.body.password,
        email: req.body.email,

    }

    let query = "SELECT*FROM ?? WHERE ??=? AND ??=?";
    let table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                let token = jwt.sign({ rows }, config.secret,
                    {
                        expiresIn: 1440
                    }
                );
                id_user = rows[0].id;
                var data = {
                    id_user: id_user,
                    akses_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                let table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate',
                            token: data.akses_token,
                            currUser: data.id_user
                        });
                    }
                });
            } else {
                res.json({
                    "Error": true,
                    "Message": "Email atau password nya salah"
                })
            }
        }
    })
}