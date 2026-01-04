import { Issuer } from "openid-client";
let cachedClient = null;
export async function getGoogleClient() {
    if (cachedClient)
        return cachedClient;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    const googleIssuer = await Issuer.discover("https://accounts.google.com");
    cachedClient = new googleIssuer.Client({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uris: [redirectUri],
        response_types: ["code"],
    });
    if (!redirectUri)
        throw new Error("GOOGLE_REDIRECT_URI is missing");
    return cachedClient;
}
