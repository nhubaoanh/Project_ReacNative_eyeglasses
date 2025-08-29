import db from "../common/db";
const usersession = (usersession) => {
this.session_id = usersession.session_id;
this.makh = usersession.makh;
this.token = usersession.token;
this.thoigian_login = usersession.thoigian_login;
this.thoigian_hoatdong = usersession.thoigian_hoatdong;
this.trangthai = usersession.trangthai;
};
usersession.getById = (id, callback) => {
  const sqlString = "SELECT * FROM usersession WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

usersession.getAll = (callback) => {
  const sqlString = "SELECT * FROM usersession";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

usersession.insert = (usersession, callback) => {
  const sqlString = "INSERT INTO usersession SET ?";
  db.query(sqlString, usersession, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

usersession.update = (usersession, id, callback) => {
  const sqlString = "UPDATE usersession SET ? WHERE id = ?";
  db.query(sqlString, [usersession, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

usersession.delete = (id, callback) => {
  db.query("DELETE FROM usersession WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default usersession;
