import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const status = ['NEW',"PENDDING"];
const expertStatus = ["PENDING", "APPROVED", "REJECTED"];

import cuid from 'cuid';

const porjectSchema = new Schema({
  name: { type: 'String', required: true, maxlength: 20 },
  title: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  cuid: {type:"String", required: true, default:function(){return cuid()} },
  status: { type: String, enum: status, default:"NEW" },
  experts: { type: [{
    name: { type: 'String', required: true, maxlength: 20 },
    status: { type: String, enum: expertStatus, required: true, default:"REJECTED"  },
    description : { type: 'String', required: true, maxlength: 1000 },
  }] ,required: true, default:[] },
});

export default mongoose.model('Project', porjectSchema);
