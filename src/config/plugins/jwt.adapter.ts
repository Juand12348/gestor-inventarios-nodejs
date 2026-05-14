import jwt, { JwtPayload } from 'jsonwebtoken';
import  { StringValue } from 'ms';
import { envs } from './envs.adapter';


const JWT_SEED = envs.JWT_SEED;

export const JwtAdapter = {

    async generarToken(payload: any, duration: StringValue = '2h'):Promise<string | null>{

        return new Promise((resolve) => {

            jwt.sign(payload, JWT_SEED, {expiresIn: duration},(err: Error | null, token?: string) => {
                if(err) return resolve(null);

                resolve(token!);
            })

        })


    },

    async validatedToken(token: string):Promise<JwtPayload | string | null>{

        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                
                if(err) return resolve(null);

                resolve(decoded!)
            })
        })


    }


}