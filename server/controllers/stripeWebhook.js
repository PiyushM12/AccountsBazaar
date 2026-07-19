import Stripe from "stripe";
import prisma from "../configs/prisma.js";
import { inngest } from "../inngest/index.js";

export const stripeWebhook = async (request, response) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  if (endpointSecret) {
    const signature = request.harders["stripe-signature"];
    try {
      event = stripeInstance.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret,
      );
    } catch (err) {
      console.log(`Webhook signature verification failed`, err.message);
      return response.sendStatus(400);
    }

    try {
      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          const sessionList = await stripeInstance.checkout.sessions.list({
            payment_intent:paymentIntent.id
          })
          const session = sessionList.data[0];
          const {transactionId ,appId} = session.metadata;
          if(appId ==='accountsbazaar' && transactionId){
            const transaction = await prisma.transaction.update({
                where:{id:transactionId},
                data:{isPaid:true}
            })
            //send new credential to buyer using email
            await inngest.send({
                name:"app/purchase",
                data:{transaction}
            })
            //mark listing as sold
            await prisma.listing.update({
                where:{id:transaction.listingId},
                data:{status:"sold"}
            })
            // add the amount to users earned balance
            await prisma.user.update({
                where:{id:transaction.ownerId},
                data:{earned:{increment : transaction.amount}}
            })
          }
          break;
       
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a response to acknowledge receipt of the event
      response.json({ received: true });
    } catch (error) {
        console.error("Webhook processing error",error)
        response.status(500).send("Internal Server Error")
    }
  }
};
