import phan_hoi from "../models/phan_hoi.model.js";

const phan_hoiController = {
  getAll: (req, res) => {
    phan_hoi.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    phan_hoi.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    phan_hoi.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    phan_hoi.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    phan_hoi.delete(id, (result) => res.send(result));
  }
};
export default phan_hoiController