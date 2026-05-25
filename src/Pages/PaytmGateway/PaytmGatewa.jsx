import React, { useState, useEffect } from "react";

const PaytmGatewa = () => {
  const [loading, setLoading] = useState(false);
  const [orderToken, setOrderToken] = useState(null);

  const createPaytmOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.crmpaisa.in/Api/RepayLoanApi/createPaytmOrderID",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lead_id: 162, // Replace with actual amount
            loan_no: "EPSB00000000001", // Replace with actual order ID
            amount: 1, // Replace with actual customer ID
          }),
        },
      );
      const data = await response.json();
      setOrderToken(data);
      return data;
    } catch (error) {
      console.error("Error creating Paytm order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaytmScript();
  }, []);

  // Load Paytm SDK
  const loadPaytmScript = () => {
    const script = document.createElement("script");

    script.src =
      "https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/INTEGR77698636129383.js";

    script.async = true;

    document.body.appendChild(script);
  };

  // Open Paytm SDK
  const makePayment = async () => {
    try {
      const paymentData = await createPaytmOrder();
      console.log(paymentData);

      const config = {
        root: "",
        flow: "DEFAULT",

        data: {
          orderId: orderToken.orderId,
          token: orderToken.txnToken,
          tokenType: "TXN_TOKEN",
          amount: Number(orderToken.amount),
        },

        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant", eventName, data);
          },
        },
      };

      const scriptLoaded = await loadPaytmScript();

      if (scriptLoaded) {
        console.log("Paytm SDK loaded successfully");
        console.log(window.Paytm);
        if (window.Paytm && window.Paytm.CheckoutJS) {
          await window.Paytm.CheckoutJS.init(config);

          console.log("Invoking Paytm Checkout");
          window.Paytm.CheckoutJS.invoke();
        } else {
          alert("Paytm SDK not loaded");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <button onClick={makePayment} disabled={loading}>
        {loading ? "Creating Order..." : "Pay with Paytm"}
      </button>
    </div>
  );
};

export default PaytmGatewa;
