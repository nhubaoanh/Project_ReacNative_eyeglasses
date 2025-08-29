import danhmuc from "../models/danhmuc.model";

const danhmucController = {
  getAll: (req, res) => {
    danhmuc.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    danhmuc.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    danhmuc.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    danhmuc.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    danhmuc.delete(id, (result) => res.send(result));
  }
};
export default danhmucController