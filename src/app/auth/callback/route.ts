// Sign-up confirmation emails and Google sign-in return to /auth/callback.
// The handler lives in (auth)/callback (served at /callback); this makes both URLs work.
export { GET } from "../../(auth)/callback/route";
