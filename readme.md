# Instructions

## Setting up locally

1. Take a pull from the `webhook_fixed` branch on GitHub
2. Switch to it by running `git fetch`
3. `git checkout webhook_fixed`
4. cd into the directory `functions`
5. `supabase functions serve --no-verify-jwt`. Make sure supabase instance is running beforehand.
6. In a new terminal in the same directory, run `ngrok http 54321`
7. Use the value in the `Forwarding` field as your URL to test from LOB the debugger
8. So, for example, `https://2d4e-2601-602-a000-68e0-14ab-2644-ea31-ad26.ngrok-free.app/functions/v1/lob-webhook-fixed` with `letters.created` as the event type.

## Testing the deployment with the LOB debugger

1. Go to https://dashboard.lob.com/webhooks/debugger/debugger-response and log in
2. Add the URL https://eseuungqholqtwndajdj.supabase.co/functions/v1/lob-webhook-fixed to the URL field
3. choose the event type `letter.created`
4. Click 'send'
5. A new record will have been created in the `letters` table

## Testing the deployment in a live environment

1. Add a new secret to the live environment called `LOB_WEBHOOKS_SECRET_KEY`.
2. The secret is unique for each webhook and can be found in the details page for the respective webhook in the dashboard.
