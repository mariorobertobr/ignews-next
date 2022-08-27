import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { stripe } from '../../services/stripe';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'
interface SubscribeButtonProps{
  priceId: string;
}


export function SubscribeButton({priceId}: SubscribeButtonProps) {

   const { data: session } = useSession()
   const  {push} = useRouter();

  async function handleSubscribe(){

    if(!session){
      return signIn('github')
    }
    if (session.activeSubscription) {
       return push('/posts');
    }

    //call api subscribe using axios
    try{
      const response = await api.post('/subscribe') 

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      stripe.redirectToCheckout({
        sessionId,
      });


    }
    catch(error){
        alert(error.message)
    }



  }

  return (
    <button onClick={handleSubscribe} type="button" className={styles.subscribeButton}>
      { !session ? `Sign in with Github` : 'Subscribe'}
    </button>
  );
}
