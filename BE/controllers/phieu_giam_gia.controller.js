import phieu_giam_gia from "../models/phieu_giam_gia.model.js";

const phieu_giam_giaController = {
  getAll: (req, res) => {
    phieu_giam_gia.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    phieu_giam_gia.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    phieu_giam_gia.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    phieu_giam_gia.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    phieu_giam_gia.delete(id, (result) => res.send(result));
  }
};
export default phieu_giam_giaController