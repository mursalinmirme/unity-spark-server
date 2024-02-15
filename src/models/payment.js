import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  admin_email: {
    type: String,
    require: true,
    trim: true,
  },
  admin_phone: {
    type: Number,
    require: true,
  },
  admin_name: {
    type: String,
    require: true,
  },
  payment_email: {
    type: String,
    require: true,
  },
  payment_id: {
    type: String,
    require: true,
  },
  admin_payment_ammount: {
    type: Number,
    require: true,
  },
  payment_status: {
    type: String,
    require: true,
  },
  transactionId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const paymentInfo = mongoose.model("paymentInfo", paymentSchema);
export default paymentInfo;
