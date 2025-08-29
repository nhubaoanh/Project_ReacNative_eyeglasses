import db from "../common/db";
const chatlieu = (chatlieu) => {
this.id = chatlieu.id;
this.chat_lieu = chatlieu.chat_lieu;
};
chatlieu.getById = (id, callback) => {
  const sqlString = "SELECT * FROM chatlieu WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

chatlieu.getAll = (callback) => {
  const sqlString = "SELECT * FROM chatlieu";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

chatlieu.insert = (chatlieu, callback) => {
  const sqlString = "INSERT INTO chatlieu SET ?";
  db.query(sqlString, chatlieu, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

chatlieu.update = (chatlieu, id, callback) => {
  const sqlString = "UPDATE chatlieu SET ? WHERE id = ?";
  db.query(sqlString, [chatlieu, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

chatlieu.delete = (id, callback) => {
  db.query("DELETE FROM chatlieu WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default chatlieu;
