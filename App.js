import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {GooglePay} from 'react-native-google-pay';
const allowedCardNetworks = ['VISA', 'MASTERCARD'];

export default function App() {
  async function Pay() {
    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
    const requestData = {
      cardPaymentMethod: {
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          // stripe (see Example):
          gateway: 'stripe',
          gatewayMerchantId: '',
          stripe: {
            publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
            version: '2018-11-08',
          },
          // other:
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },

        allowedCardNetworks,
        allowedCardAuthMethods,
      },
      transaction: {
        totalPrice: '10',
        totalPriceStatus: 'FINAL',
        currencyCode: 'USD',
      },
      merchantName: 'Example Merchant',
    };
    // Set the environment before the payment request
    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      ready => {
        if (ready) {
          // Request payment token
          GooglePay.requestPayment(requestData)
            .then(token => {
              // Send a token to your payment gateway
            })
            .catch(error => console.log(error.code, error.message));
        }
      },
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text onPress={Pay} >Pay with google-pay</Text>
    </View>
  );
}
