export default async function displayRazorpay(orderInfoObj) {
    const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            ...orderInfoObj
        })
    });

    const data = await res.json();
  
    console.log(data);
  
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      currency: data.currency,
      amount: data.amount,
      name: "E Learning",
      description: "Test Transaction",
      image: "/logo.png",
      order_id: data.id,
      handler: function (response) {
        response["cartItems"]=data.cartItems;
        verifySignature(response);
      },
      prefill: {
        name: "Sanjib Dolai",
        email: "sanjib@gmail.com",
        contact: "9999999999",
      },
      
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }


  const verifySignature = async (response) => {
      try {
          const res = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({response}),
              credentials: "include"
          });

          if (!res.status === 200) {
              throw new Error(res.error)
          }
          const data = await res.json();
          console.log(data);
          if(data.payment==='Success'){
              window.location="/order/success";
          }else{
            window.location="/order/failed";
          }

      } catch (error) {
          console.log(error);
      }

  }