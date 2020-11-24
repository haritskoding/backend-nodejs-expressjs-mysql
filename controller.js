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
};


//menambahkan data mahasiswa
exports.tambahMahasiswa = function (req, res) {
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query("INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)",
        [nim, nama, jurusan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menambahkan Data!", res)
            }
        });
};

//mengubah data berdasarkan id mahasiswa
exports.ubahMahasiswa = function (req, res) {
    let id = req.body.id_mahasiswa;
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query("UPDATE mahasiswa SET nim=?,nama=?,jurusan=? WHERE id_mahasiswa =?", [nim, nama, jurusan, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Data berhasil di ubah", res)
            }
        });
};

//menghapus data berdasarkan id mahasiswa
exports.hapusMahasiswa = function (req, res) {
    let id = req.body.id;

    connection.query("DELETE FROM mahasiswa WHERE id_mahasiswa =?", [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Data berhasil di hapus", res)
            }
        });
};


//menampilkan matakuliah group
exports.tampilGroupMatkul = function (req, res) {
    connection.query('SELECT mahasiswa.id_mahasiswa,mahasiswa.nim,mahasiswa.nama,mahasiswa.jurusan,matakuliah.matakuliah,matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matkul = matakuliah.id_matakuliah AND krs.id_mhs = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.oknested(rows, res)
            }
        }
    )
}