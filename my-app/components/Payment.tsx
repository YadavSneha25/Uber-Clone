import { View, Text, StyleSheet, Alert } from "react-native";
import CustomButton from "@/components/CustomButtons";
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from "react";
import { PaymentProps } from "@/types/type";
import { fetchAPI } from "@/lib/fetch";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime
}:PaymentProps) => {
  //const [publishableKey, setPublishableKey] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success,setSuccess]=useState(false);

  const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {
    // Make a request to your own server.
    const {paymentIntent,customer} = await fetchAPI("/(api)/(stripe)/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      name:fullName ||email.split("@")[0],
      email:email,
      amount:amount,
      paymentMethodId:paymentMethod.id,
    }),
  },
);

    if(paymentIntent.client_secret){
        const {result}=await fetchAPI("/(api)/(stripe)/pay",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        payment_method_id:paymentMethod.id,
        payment_intent_id:paymentIntent.id,
        customer_id:customer,
     
      }),
    });
    if(result.client_secret){

      //ride/create
    
    }
  }


  


    // Call the `intentCreationCallback` with your server response's client secret or error
    const { clientSecret, error } = await response.json();
    if (clientSecret) {
      intentCreationCallback({clientSecret});
    } else {
      intentCreationCallback({error});
    }
  }

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: 'USD',
        },
        confirmHandler: confirmHandler
      }
    });
    if (error) {
      // handle error
      console.error("Error initializing payment sheet:", error);
    }
  };

 

 
  
   
  

  const openPaymentSheet = async () => {
    // Call initializePaymentSheet before presenting the payment sheet
    await initializePaymentSheet();
  
    // Present the payment sheet and handle any errors
    const { error } = await presentPaymentSheet();
    
    if (error) {
      Alert.alert(
        'Payment Error', // Title of the alert
        `Error code: ${error.code}\n${error.message}`, // Error message
      );
    } else {
      setSuccess(true); // Assuming setSuccess is a state update function
    }
  };
  return (
    <View style={styles.container}>
      <CustomButton
        title="Confirm Ride"
        style={styles.button}
        onPress={openPaymentSheet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Payment;
