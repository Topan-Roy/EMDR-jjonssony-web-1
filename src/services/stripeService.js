import axios from "axios";
import { AppConstants } from "../utils/app_constant";

export const createPaymentIntent = async (amount, currency) => {
  try {
    const response = await axios.post("/api/create-payment-intent", {
      amount,
      currency: currency || "gbp",
    });

    if (response.status === 200) {
      console.log("✅ Intent ID:", response.data.id);
      return {
        id: response.data.id,
        client_secret: response.data.client_secret,
      };
    } else {
      console.error("❌ API Error:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error in createPaymentIntent:", error.response?.data || error.message);
    return null;
  }
};
