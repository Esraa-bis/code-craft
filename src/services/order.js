import { BASE_URL, BEARER_KEY } from "./api";
import { SessionTokenStorage } from "./local-storage";


// Add to cart
export async function createOrder({ paymentMethod, course, couponCode }) {
  const response = await fetch(`${BASE_URL}/Order/createOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: JSON.stringify({ paymentMethod, course, couponCode }),
  });

  return response.json();
}
// convert from order to cart
export async function convertFromCartToOrder({ paymentMethod, couponCode }) {
  const response = await fetch(`${BASE_URL}/Order/convertFromCartToOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
    body: JSON.stringify({ paymentMethod, couponCode }),
  });

  return response.json();
}
// pay with stripe
export async function payWithStripe(orderId) {
  const response = await fetch(`${BASE_URL}/Order/payWithStripe/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${BEARER_KEY}${SessionTokenStorage.getToken()}`,
    },
  });

  return response.json();
}