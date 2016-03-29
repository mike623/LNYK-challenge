var _ = require('lodash');
import History from '../models/history';

// log history
exports.historyAdd = function(req, res) {
  // console.log("historyAdd");
  // console.log("req.body",req.body);
  let h = new History();
  h.type = req.body.type;
  h.save((err,saved)=>{
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ history: saved });
  })
};

// log history
exports.getHistories = function(req, res) {
  History.find().sort('-dateAdded').exec((err, histories) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ histories });
  });
};
