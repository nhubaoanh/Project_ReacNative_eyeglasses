import thuonghieu from "../models/thuonghieu.model";

const thuonghieuController = {
  getAll: (req, res) => {
    thuonghieu.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    thuonghieu.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    thuonghieu.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    thuonghieu.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    thuonghieu.delete(id, (result) => res.send(result));
  }
};
export default thuonghieuController