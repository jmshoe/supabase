// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Import crypto library
//import { createHash } from "https://deno.land/std/hash/mod.ts";

// function generateMD5Hash(addressLine1, addressLine2) {
//   const hasher = createHash("md5");
//   hasher.update(addressLine1 + addressLine2);
//   return hasher.toString();
// }

//import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Initialize the Supabase client outside the handler
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? 'https://eseuungqholqtwndajdj.supabase.co',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
);

Deno.serve(async (req) => {
    try {
        // Parse the JSON payload
        const payload = await req.json();
        const letterData = payload.body;
        const recipient = letterData.to;
        const sender = letterData.from;

        // Preparing data for insertion
        // Note: You'll need to modify this to match your database schema and handling
        const insertData = {
          id: letterData.id,
          description: letterData.description,
          url: letterData.url,
          color: letterData.color,
          double_sided: letterData.double_sided,
          address_placement: letterData.address_placement,
          return_envelope: letterData.return_envelope,
          extra_service: letterData.extra_service,
          expected_delivery_date: letterData.expected_delivery_date,
          tracking_number: letterData.tracking_number,
          mail_type: letterData.mail_type,
          status: letterData.status,
          date_created: letterData.date_created,
          send_date: letterData.send_date,
          //owner_id: generateMD5Hash(recipient.address_line1, recipient.address_line2),
          //property_id: generateMD5Hash(letterData.merge_variables.property_address, letterData.merge_variables.property_address_line2),
      
          // Recipient mappings
          to_id: recipient.id,
          to_name: recipient.name,
          to_address_line1: recipient.address_line1,
          to_address_line2: recipient.address_line2,
          to_address_city: recipient.address_city,
          to_address_state: recipient.address_state,
          to_address_zip: recipient.address_zip,
          to_address_country: recipient.address_country,
          to_date_created: recipient.date_created,
      
          // Sender mappings
          from_id: sender.id,
          from_name: sender.name,
          from_address_line1: sender.address_line1,
          from_address_line2: sender.address_line2,
          from_address_city: sender.address_city,
          from_address_state: sender.address_state,
          from_address_zip: sender.address_zip,
          from_address_country: sender.address_country,
          from_date_created: sender.date_created

          // Merge variables
        //   merge_variables: letterData.merge_variables,
        //   offer_price: letterData.merge_variables.offer_price,
        //   sender_name: letterData.merge_variables.sender_name,
        //   phone_number: letterData.merge_variables.phone_number,
        //   sender_line2: letterData.merge_variables.sender_line2,
        //   property_city: letterData.merge_variables.property_city,
        //   page2_insert_url: letterData.merge_variables.page2_insert_url,
        //   property_address: letterData.merge_variables.property_address,
        //   sender_signature_image_url: letterData.merge_variables.sender_signature_image_url,
      
          // Metadata
        //   metadata: letterData.metadata,
        //   market: letterData.metadata.market,
        //   source: letterData.metadata.source,
        //   campaign: letterData.metadata.campaign,

          // Additional fields
          // Note: These fields need to be filled based on your application's logic
          // For example, `to_metadata`, `from_metadata`, `metadata` can be JSON objects
          // containing additional data you want to store.
          // Fields like `owner_id`, `property_id`, `market`, etc., must be derived
          // from your application's context or the webhook payload (if available).
      
          // Example of a field that may need parsing or additional logic
          //thumbnails: JSON.stringify(letterData.thumbnails) // Storing as JSON string
        };

        // Inserting data into the 'letters' table
        // This will depend on how you connect to and interact with your database in Deno
        // For example, using a PostgreSQL client for Deno
        
        // Inserting data into the 'letters' table
        const { data, error } = await supabase
            .from('letters')
            .insert([insertData]);

        // Handle any errors
        if (error) throw error;

        // Return a success response
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } catch (error) {
        // Returning an error response
        return new Response(JSON.stringify({ message: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
});


// To invoke:
// curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
