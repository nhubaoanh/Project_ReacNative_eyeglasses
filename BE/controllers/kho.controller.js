import kho from "../models/kho.model";

const khoController = {
  getAll: (req, res) => {
    kho.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    kho.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    kho.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    kho.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    kho.delete(id, (result) => res.send(result));
  }
};
export default khoController