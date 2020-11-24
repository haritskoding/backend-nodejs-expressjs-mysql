'use strict';

const response = require('./res');
const connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST Api ku berjalan",res)
}

//menampilkan semua data mahasiswa
exports.tampilSemuaMahasiswa = function (req, res) {
    connection.query("SELECT*FROM mahasiswa", function (err, rows, fields) {
        if (err) {
            connection.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};