'use strict';

const response = require('./res');
const connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST Api ku berjalan", res)
}

//menampilkan semua data mahasiswa
exports.tampilSemuaMahasiswa = function (req, res) {
    connection.query("SELECT*FROM mahasiswa", function (err, rows, fields) {
        if (err) {
            console.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

//menampilkan semua data mahasiswa berdasarkan id
exports.tampilBerdasarId = function (req, res) {
    let id = req.params.id;
    connection.query("SELECT*FROM mahasiswa WHERE id_mahasiswa =?", [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            }
        });
}