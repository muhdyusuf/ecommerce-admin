'use client'
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
import { Loader2, ShieldAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DeleteAlertDialogActionsProps {
 data:{
    id:number,
    name:string
 }
 close:()=>void
 action:(id:number)=>Promise<any>
}

const DeleteAlertDialogAction:FC<DeleteAlertDialogActionsProps>=({data,close,action})=>{
    const [loading, setLoading] = useState<boolean>(false)
    const [deleted, setDeleted] = useState<boolean>(false)
    const router=useRouter()
    async function handleDelete(){
        setLoading(true)
        try {
          const {error}=await action(data.id)
          error?setDeleted(false):setDeleted(true)
          
        } catch (error) {
            setDeleted(false)
        }
        finally{
            setLoading(false)
            setTimeout(()=>close(),1000)
            router.refresh()
        }
        

    }
 return(
    <AlertDialogContent>
    <AlertDialogHeader>
        
            <AlertDialogTitle>{deleted?`Deleted`:`Are you absolutely sure?`}</AlertDialogTitle>
            <AlertDialogDescription>
                {deleted?(
                `${data.name} deleted from the database.`
                ):(
                `This action cannot be undone. This will permanently delete 
                and remove ${data.name} from the database.`)}
            </AlertDialogDescription>
            
      
    </AlertDialogHeader>
    <div
        className='flex gap-1 text-xs items-center'
    >
        <ShieldAlert
            className='w-4 aspect-square'
        />
        <p>item will not deleted if any relation to product exists</p>
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

export default DeleteAlertDialogAction