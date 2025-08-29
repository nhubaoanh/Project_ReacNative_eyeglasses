import db from "../common/db";
const danhgia = (danhgia) => {
this.id = danhgia.id;
this.masp = danhgia.masp;
this.makh = danhgia.makh;
this.sao = danhgia.sao;
this.binhluan = danhgia.binhluan;
this.ngaydanhgia = danhgia.ngaydanhgia;
};
danhgia.getById = (id, callback) => {
  const sqlString = "SELECT * FROM danhgia WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

danhgia.getAll = (callback) => {
  const sqlString = "SELECT * FROM danhgia";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

danhgia.insert = (danhgia, callback) => {
  const sqlString = "INSERT INTO danhgia SET ?";
  db.query(sqlString, danhgia, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

danhgia.update = (danhgia, id, callback) => {
  const sqlString = "UPDATE danhgia SET ? WHERE id = ?";
  db.query(sqlString, [danhgia, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

danhgia.delete = (id, callback) => {
  db.query("DELETE FROM danhgia WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default danhgia;
