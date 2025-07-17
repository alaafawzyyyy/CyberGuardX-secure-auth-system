      import jwt from "jsonwebtoken";

      export const accessToken = (id,role)=>{
        return jwt.sign({id, role},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
      )}

      export const refreshToken = (id) =>{
       return jwt.sign({id},
        process.env.REFRESH_ACCESS_TOKEN,
        {expiresIn: "7d"}
      )}

      export const newAccessToken = (userId)=>{
      return jwt.sign({id: userId},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}

)

      }
