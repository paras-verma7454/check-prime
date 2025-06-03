import express from 'express';
import cors from 'cors';
import {z} from 'zod';

const app = express();
app.use(express.json());
app.use(cors());

function isPrime (n: number) {

   let cnt=0;

   for(let i=1;i<=Math.sqrt(n);i++){
    if(n%i==0){

        cnt++;

        if(n/i !== i){
            cnt++;
        }
    }

   }
   return cnt==2;
}

const inputBody = z.object({
    number: z.number()
})

app.get('/check-prime', (req, res): any => {


    if(req.body == null){
        return res.status(400).json({
            error:"Empty body"
        })
    }

    const body = req.body;

   
        
        const {success} = inputBody.safeParse(body);
        
        if(!success){
            return res.status(400).json({
                error:"Invalid input, send a number and it should not be a string"
            })
        }
        
        const number = body.number;
        if ( number < 1) {
            return res.status(400).json({
                error: "Please send a positive integer"
            });
        }
        const status = isPrime(number);
        return res.json({
            number: number,
            isPrime: status
        })

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
