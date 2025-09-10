import nhan_vien from "../models/nhan_vien.model.js";

const nhan_vienController = {
  getAll: (req, res) => {
    nhan_vien.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    nhan_vien.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    nhan_vien.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    nhan_vien.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    nhan_vien.delete(id, (result) => res.send(result));
  }
};
export default nhan_vienController