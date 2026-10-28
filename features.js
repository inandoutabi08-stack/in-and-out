/* ==========================================================================
   features.js  -  THE ONE SETTINGS FILE FOR ALL ON/OFF SWITCHES
   --------------------------------------------------------------------------
   HOW TO READ THIS FILE:
   - "false" means OFF.  The button stays visible, but it only shows a polite
     "Coming soon" message. Nothing breaks.
   - "true" means ON.  The site will try to run that feature.
   - ALL switches start OFF. Do NOT turn one ON until you have signed up for
     the service described above it AND the real code for it has been added
     (that happens in later steps, and I will guide you).
   - Only change the word false to true (or back). Keep the comma at the end.
   ========================================================================== */

window.INANDOUT_FEATURES = {

  /* ---- 1. REAL PAYMENTS ------------------------------------------------
     WHAT IT DOES: lets a client really pay a worker through the website.
     SIGN UP FIRST: a payment provider that works in Uzbekistan (examples
       only: Payme, Click, Uzum). You will need a business account with them.
     TO TURN ON: (1) finish signing up, (2) get the real code added in the
       file js/features/payments.js (a later step), (3) change false to true.
  ------------------------------------------------------------------------ */
  payments: false,

  /* ---- 2. ESCROW (money holding) ----------------------------------
     WHAT IT DOES: holds the client's money until the job is done,
       and only then releases it to the worker.
     SIGN UP FIRST: the same payment provider as above, and you must ask
       them whether they support holding money (escrow). Escrow needs
       "payments" to be ON first. A lawyer should check the rules for this.
     TO TURN ON: (1) turn "payments" ON first, (2) get the real code added
       in js/features/escrow.js (a later step), (3) change false to true.
  ------------------------------------------------------------------------ */
  escrow: false,

  /* ---- 3. AUTOMATIC ID / FACE CHECK ------------------------------------
     WHAT IT DOES: automatically checks a person's ID document and face
       so they can get a real "Verified" status.
     SIGN UP FIRST: an identity-checking service (for example a national
       digital-ID service such as MyID, or an international ID-check
       company; we will choose together later). Personal data laws apply:
       DRAFT: needs lawyer review.
     TO TURN ON: (1) sign up, (2) get the real code added in
       js/features/idcheck.js (a later step), (3) change false to true.
  ------------------------------------------------------------------------ */
  idCheck: false,

  /* ---- 4. AUDIO CALLS --------------------------------------------------
     WHAT IT DOES: lets a client and a worker talk by voice inside the
       website, without sharing phone numbers.
     SIGN UP FIRST: an audio-call service (examples only: Agora, Twilio,
       Daily). They usually charge per minute.
     TO TURN ON: (1) sign up, (2) get the real code added in
       js/features/calls.js (a later step), (3) change false to true.
  ------------------------------------------------------------------------ */
  audioCalls: false,

  /* ---- 5. SMS VERIFICATION ---------------------------------------------
     WHAT IT DOES: sends a short code by text message to a phone number so
       people can prove the number is theirs.
     SIGN UP FIRST: an SMS provider that can send to Uzbekistan numbers
       (example only: Eskiz). You pay per message.
     TO TURN ON: (1) sign up, (2) get the real code added in
       js/features/sms.js (a later step), (3) change false to true.
  ------------------------------------------------------------------------ */
  smsVerification: false,

  /* ---- 6. EMAIL NOTIFICATIONS ------------------------------------------
     WHAT IT DOES: sends emails such as "Someone applied to your gig".
     SIGN UP FIRST: an email-sending service (examples only: Brevo,
       Resend, EmailJS). Many have a free starter plan.
     TO TURN ON: (1) sign up, (2) get the real code added in
       js/features/email.js (a later step), (3) change false to true.
  ------------------------------------------------------------------------ */
  emailNotifications: false

};