'use strict';


module.exports = function (app) {
    const jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilSemuaMahasiswa);

    app.route('/tampil/:id')
        .get(jsonku.tampilBerdasarId);

    app.route('/tambah')
        .post(jsonku.tambahMahasiswa);
}


