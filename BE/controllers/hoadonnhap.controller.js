import hoadonnhap from "../models/hoadonnhap.model";

const hoadonnhapController = {
  getAll: (req, res) => {
    hoadonnhap.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    hoadonnhap.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    hoadonnhap.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    hoadonnhap.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    hoadonnhap.delete(id, (result) => res.send(result));
  }
};
export default hoadonnhapController