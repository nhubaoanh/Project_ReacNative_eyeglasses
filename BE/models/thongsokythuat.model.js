import db from "../common/db";
const thongsokythuat = (thongsokythuat) => {
this.id = thongsokythuat.id;
this.masp = thongsokythuat.masp;
this.ten_thongso = thongsokythuat.ten_thongso;
this.giatri = thongsokythuat.giatri;
};
thongsokythuat.getById = (id, callback) => {
  const sqlString = "SELECT * FROM thongsokythuat WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

thongsokythuat.getAll = (callback) => {
  const sqlString = "SELECT * FROM thongsokythuat";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

thongsokythuat.insert = (thongsokythuat, callback) => {
  const sqlString = "INSERT INTO thongsokythuat SET ?";
  db.query(sqlString, thongsokythuat, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

thongsokythuat.update = (thongsokythuat, id, callback) => {
  const sqlString = "UPDATE thongsokythuat SET ? WHERE id = ?";
  db.query(sqlString, [thongsokythuat, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

thongsokythuat.delete = (id, callback) => {
  db.query("DELETE FROM thongsokythuat WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default thongsokythuat;
