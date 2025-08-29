import phieukiemke from "../models/phieukiemke.model";

const phieukiemkeController = {
  getAll: (req, res) => {
    phieukiemke.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    phieukiemke.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    phieukiemke.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    phieukiemke.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    phieukiemke.delete(id, (result) => res.send(result));
  }
};
export default phieukiemkeController