import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const historySchema = new Schema({
  dateAdded: { type: 'Date', default: Date.now, required: true },
  projectName: { type: String, required: true },
  expertName: { type: String, required: true },
  action: { type: String, required: true },
});

export default mongoose.model('History', historySchema);
