// import axios from 'axios'
// import {NextFunction, Request , Response } from 'express'
// import z from 'zod';
export {};
// const GoogleUser  = z.object({
//     googleId: z.string(),
//     email: z.string().email(),
//     name: z.string(),
//     picture: z.string(),
//     verified: z.boolean()
// })
// type Authenticated_Request = z.infer<typeof GoogleUser>
// interface AuthenticatedRequest extends Request {
//     user?: Authenticated_Request
// }
// export async function GoogleOauth(req:AuthenticatedRequest , res: Response , next: NextFunction ){
//     try{
//         const {access_token} = req.body
//         console.log("This is The Access Token:",{access_token})
//         if(!access_token){
//             return res.status(404).json({
//                 error: "No Acess Token was Found "
//             })
//         }
//         const GoogleResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//             headers:
//                { 
//                 Authorization: `Bearer ${access_token}`
//                },
//         });
//         req.user = {
//             googleId: GoogleResponse.data.sub,
//             email: GoogleResponse.data.email,
//             name: GoogleResponse.data.name,
//             picture: GoogleResponse.data.picture,
//             verified: GoogleResponse.data.email_verified,
//         };
//         console.log("this is req.user from GoogleOauth.ts",req.user)
//         next();
//     } catch(error) {
//         console.error('Google authentication failed:', error);
//         return res.status(401).json({ 
//           error: 'Invalid Google access token',
//           details: error instanceof Error ? error.message : 'Unknown error'
//         });
//     }
// }
