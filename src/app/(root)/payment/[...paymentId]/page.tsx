import {FC} from 'react'

interface pageProps {
 params:{
    paymentId:string
 }
}

const page:FC<pageProps>=({params})=>{
    const {paymentId}=params
 return(
    <div>
       {paymentId}
    </div>
)}

export default page