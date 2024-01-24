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
import { Button } from '../../../components/ui/button'
import { Product } from '@/type/product'
import { Loader2, ShieldAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DeleteAlertDialogProps {
 product:{
    id:number,
    name:string
    imageUrls:string[]
 }
 close:()=>void

}

const DeleteAlertDialog:FC<DeleteAlertDialogProps>=({product,close})=>{
    const [loading, setLoading] = useState<boolean>(false)
    const [deleted, setDeleted] = useState<boolean>(false)
    const router=useRouter()
    async function handleDelete(){
        setLoading(true)
        try {
            const res=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/${product.id}`,{
                method:"DELETE"
            })
            
            const {error}=await res.json()

            if(!error){
                setDeleted(true)
                setLoading(false)
                setTimeout(()=>close(),1000)
            }
            else{
                setDeleted(false)
                setLoading(false)
            }


        } catch (error) {
            setDeleted(false)
        }
       
        
    }
 return(
    <AlertDialogContent>
    <AlertDialogHeader>
            <AlertDialogTitle>
                {deleted?`Deleted`:`Are you absolutely sure?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
                {deleted?(
                `${product.name} deleted from the database.`
                ):(
                `This action cannot be undone. This will permanently delete 
                and remove ${product.name} from the database.`)}
            </AlertDialogDescription>
    </AlertDialogHeader>
    <div
        className='flex gap-1 text-xs items-center'
    >
        <ShieldAlert
            className='w-4 aspect-square'
        />
        <p>Product will not deleted if any relation to order exists</p>
    </div>
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