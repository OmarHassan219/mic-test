import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(`pk_test_51Na06XDvCe1ScO91kbmy1F4C7hjobwQ9ofuunQtnAaB3WK9cskLC4vFZPqb4fgalDP8xo2FNEOcZm5oxPMbC9UPI00sWMkh50c`);
 
  }

  return stripePromise;
}

export default getStripe;