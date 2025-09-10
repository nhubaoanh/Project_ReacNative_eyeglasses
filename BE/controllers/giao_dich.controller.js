import giao_dich from "../models/giao_dich.model.js";

const giao_dichController = {
  getAll: (req, res) => {
    giao_dich.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    giao_dich.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    giao_dich.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    giao_dich.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    giao_dich.delete(id, (result) => res.send(result));
  }
};
export default giao_dichController