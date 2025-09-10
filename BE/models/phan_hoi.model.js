import db from "../common/db.js";
const phan_hoi = (phan_hoi) => {
this.maph = phan_hoi.maph;
this.makh = phan_hoi.makh;
this.masp = phan_hoi.masp;
this.danhgia = phan_hoi.danhgia;
this.binhluan = phan_hoi.binhluan;
this.ngaytao = phan_hoi.ngaytao;
};
phan_hoi.getById = (id, callback) => {
  const sqlString = "SELECT * FROM phan_hoi WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

phan_hoi.getAll = (callback) => {
  const sqlString = "SELECT * FROM phan_hoi";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

phan_hoi.insert = (phan_hoi, callback) => {
  const sqlString = "INSERT INTO phan_hoi SET ?";
  db.query(sqlString, phan_hoi, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

phan_hoi.update = (phan_hoi, id, callback) => {
  const sqlString = "UPDATE phan_hoi SET ? WHERE id = ?";
  db.query(sqlString, [phan_hoi, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

phan_hoi.delete = (id, callback) => {
  db.query("DELETE FROM phan_hoi WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default phan_hoi;
