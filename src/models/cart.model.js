import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartSchema = new mongoose.Schema({
  id: { type: String, required: true },
  products: { type: [], required: true }
}, { timestamps: true });

productsSchema.plugin(mongoosePaginate);

export default mongoose.model('Cart', cartSchema);