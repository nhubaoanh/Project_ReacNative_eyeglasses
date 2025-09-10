import trang_thai_lich_hen from "../models/trang_thai_lich_hen.model.js";

const trang_thai_lich_henController = {
  getAll: (req, res) => {
    trang_thai_lich_hen.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    trang_thai_lich_hen.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    trang_thai_lich_hen.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    trang_thai_lich_hen.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    trang_thai_lich_hen.delete(id, (result) => res.send(result));
  }
};
export default trang_thai_lich_henController