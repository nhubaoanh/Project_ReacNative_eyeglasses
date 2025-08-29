import kieudang from "../models/kieudang.model";

const kieudangController = {
  getAll: (req, res) => {
    kieudang.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    kieudang.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    kieudang.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    kieudang.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    kieudang.delete(id, (result) => res.send(result));
  }
};
export default kieudangController