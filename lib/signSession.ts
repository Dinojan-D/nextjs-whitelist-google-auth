import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
 
const secretKey = process.env.COOKIE_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

type sessionPayload = {
  uid:string,
  perm:string
}


export async function encrypt(payload:sessionPayload) {
  
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5h')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session',error)
  }
}