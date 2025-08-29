import hoadonchitiet from "../models/hoadonchitiet.model";

const hoadonchitietController = {
  getAll: (req, res) => {
    hoadonchitiet.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    hoadonchitiet.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    hoadonchitiet.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    hoadonchitiet.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    hoadonchitiet.delete(id, (result) => res.send(result));
  }
};
export default hoadonchitietController