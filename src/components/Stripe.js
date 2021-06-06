import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default class TakeMoney extends React.Component {
  //The email and the amount can be taken based on the user and the item price once integrated with the checkout page. Payment info can be remembered by checking 'Remember Me'
  data = { email: "teamKimPossible@gmail.com", amount: 2000 };
  onToken = (token) => {
    this.data["token"] = token.card; //Takes the card info for charging the user in live mode
    fetch(`/save-stripe-token/${JSON.stringify(this.data)}`, {
      method: "POST",
    }).then((response) => {
      response.json().then((data) => {
        alert(`${data.message}`);
      });
    });
  };
  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        amount={this.data.amount}
        email={this.data.email}
        currency='USD'
        stripeKey='pk_test_51IBWOAIGBdXhz29TWRY6MjXouhgfvf3wtJMx3b3hwEozhBQ1so2qxP5WpFLdBwMX0IpIdJsC2LJ0EmKwkBAYHqEF005V3RV8A9' //Publishable Key
      />
    );
  }
}
