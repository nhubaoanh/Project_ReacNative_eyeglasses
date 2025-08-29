import hoadonnhapchitiet from "../models/hoadonnhapchitiet.model";

const hoadonnhapchitietController = {
  getAll: (req, res) => {
    hoadonnhapchitiet.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    hoadonnhapchitiet.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    hoadonnhapchitiet.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    hoadonnhapchitiet.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    hoadonnhapchitiet.delete(id, (result) => res.send(result));
  }
};
export default hoadonnhapchitietController