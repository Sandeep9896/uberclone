import Razorpay from "razorpay";
import crypto from "crypto";

const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay keys missing in env");
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

export const createOrder = async (req, res) => {
  console.log("createOrder hit, body:", req.body);
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: "amount required" });

    const razorpay = getRazorpay();

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    console.log("order created:", order.id);
    return res.json(order);
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({ error: err.message || "Error creating order" });
  }
};

export const verify = (req, res) => {
  console.log("verify hit, body:", req.body);
  try {
    const { payment_id, order_id, signature } = req.body;
    if (!payment_id || !order_id || !signature) return res.status(400).json({ success: false });

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    if (generated_signature === signature) return res.json({ success: true });
    return res.status(400).json({ success: false });
  } catch (err) {
    console.error("verify error:", err);
    return res.status(500).json({ success: false });
  }
};
