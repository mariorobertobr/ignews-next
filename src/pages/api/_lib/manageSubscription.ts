import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    price_amount: subscription.items.data[0].price.unit_amount_decimal,
  };

  if (createAction) {
    await fauna.query(
      q.Create(q.Collection("SUBSCRIPTIONS"), {
        data: subscriptionData,
      })
    );
  } else {
    try {
      await fauna.query(
        q.Replace(
          q.Select(
            "ref",
            q.Get(q.Match(q.Index("subscription_by_id"), subscriptionId))
          ),
          { data: subscriptionData }
        )
      );
    } catch (e) {
      // console.log(e);
    }
  }
}
