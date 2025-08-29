import db from "../common/db";
const mausac = (mausac) => {
this.id = mausac.id;
this.mau_sac = mausac.mau_sac;
this.ma_hex = mausac.ma_hex;
};
mausac.getById = (id, callback) => {
  const sqlString = "SELECT * FROM mausac WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

mausac.getAll = (callback) => {
  const sqlString = "SELECT * FROM mausac";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

mausac.insert = (mausac, callback) => {
  const sqlString = "INSERT INTO mausac SET ?";
  db.query(sqlString, mausac, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

mausac.update = (mausac, id, callback) => {
  const sqlString = "UPDATE mausac SET ? WHERE id = ?";
  db.query(sqlString, [mausac, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

mausac.delete = (id, callback) => {
  db.query("DELETE FROM mausac WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default mausac;
