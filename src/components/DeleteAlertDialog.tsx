import {FC, useState} from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { Product } from '@/type/product'
import { Loader2 } from 'lucide-react'

interface DeleteAlertDialogProps {
 product:Product
 close:()=>void

}

const DeleteAlertDialog:FC<DeleteAlertDialogProps>=({product,close})=>{
    const [loading, setLoading] = useState<boolean>(false)
    const [deleted, setDeleted] = useState<boolean>(false)
    async function handleDelete(){
        setLoading(true)
        try {
            const res=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`,{
                method:"PATCH",
                body:JSON.stringify({product:{
                    ...product
                }})
            })
            
          
           
            if(res.status===200){
                const {data:{id}}=await res.json()

                console.log(id)
                setDeleted(true)
                setTimeout(close,2000)
                
            }
        } catch (error) {
            setDeleted(false)
        }
        finally{
            setLoading(false)
        }
        

    }
 return(
    <AlertDialogContent>
    <AlertDialogHeader>
        {!deleted?(
            <>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete 
                and remove {product.name} from the database.
            </AlertDialogDescription>
            </>
        ):(
            <>
            <AlertDialogTitle>Deleted</AlertDialogTitle>
            <AlertDialogDescription>
                {product.name} deleted from the database.
            </AlertDialogDescription>
            </>
        )}
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel
        disabled={loading}
      >{deleted?"close":"cancel"}
      </AlertDialogCancel>
       
            {!deleted&&(
            <Button
                type='button'
                variant={'destructive'}
                onClick={handleDelete}
                disabled={loading}
                className='w-24'
            >
                {
                    loading?(<Loader2 className='animate-spin'/>):("Delete")
                }
            </Button>)}
     
    </AlertDialogFooter>
  </AlertDialogContent>

)}

export default DeleteAlertDialog