// import {redis} from '../redis/redis.js'
export {};
// export async function redisCon_Verification() {
//     try {
//         //* we actaully setting a value to redis so that we can check if it's actually getting in or no 
//         const testKey = `test${Date.now()}`
//         await redis.set(testKey , 'redis Connection is established' , {ex:60})
//         const value = await redis.get(testKey)
//         console.log("Redis Verification", value)
//         //* and here after getting the console log msg that we getting a value we deleting the value since it's just a test
//         await redis.del(testKey)
//         return true
//     } catch(err) {
//         console.error('There was an error:' + err)
//         return false
//     }
// }
