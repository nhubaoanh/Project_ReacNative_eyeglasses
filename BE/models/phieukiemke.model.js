import db from "../common/db";
const phieukiemke = (phieukiemke) => {
this.id = phieukiemke.id;
this.mucdich = phieukiemke.mucdich;
this.manv = phieukiemke.manv;
this.makho = phieukiemke.makho;
this.thoigian = phieukiemke.thoigian;
};
phieukiemke.getById = (id, callback) => {
  const sqlString = "SELECT * FROM phieukiemke WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

phieukiemke.getAll = (callback) => {
  const sqlString = "SELECT * FROM phieukiemke";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

phieukiemke.insert = (phieukiemke, callback) => {
  const sqlString = "INSERT INTO phieukiemke SET ?";
  db.query(sqlString, phieukiemke, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ... {tableName} });
  });
};

phieukiemke.update = (phieukiemke, id, callback) => {
  const sqlString = "UPDATE phieukiemke SET ? WHERE id = ?";
  db.query(sqlString, [phieukiemke, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

phieukiemke.delete = (id, callback) => {
  db.query("DELETE FROM phieukiemke WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default phieukiemke;
