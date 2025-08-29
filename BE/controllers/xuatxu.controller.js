import xuatxu from "../models/xuatxu.model";

const xuatxuController = {
  getAll: (req, res) => {
    xuatxu.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    xuatxu.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    xuatxu.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    xuatxu.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    xuatxu.delete(id, (result) => res.send(result));
  }
};
export default xuatxuController