import phieukiemke_chitiet from "../models/phieukiemke_chitiet.model";

const phieukiemke_chitietController = {
  getAll: (req, res) => {
    phieukiemke_chitiet.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    phieukiemke_chitiet.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    phieukiemke_chitiet.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    phieukiemke_chitiet.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    phieukiemke_chitiet.delete(id, (result) => res.send(result));
  }
};
export default phieukiemke_chitietController