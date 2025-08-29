import danhgia from "../models/danhgia.model";

const danhgiaController = {
  getAll: (req, res) => {
    danhgia.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    danhgia.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    danhgia.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    danhgia.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    danhgia.delete(id, (result) => res.send(result));
  }
};
export default danhgiaController