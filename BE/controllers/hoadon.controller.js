import hoadon from "../models/hoadon.model";

const hoadonController = {
  getAll: (req, res) => {
    hoadon.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    hoadon.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    hoadon.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    hoadon.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    hoadon.delete(id, (result) => res.send(result));
  }
};
export default hoadonController