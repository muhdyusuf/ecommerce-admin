"use client"


import { useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { userSignInSchema } from "@/lib/validation/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type SignInForm=z.infer<typeof userSignInSchema>

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
    const [seePassword, setSeePassword] = useState<boolean>(false)
    const form=useForm<SignInForm>({
        resolver:zodResolver(userSignInSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })



    const router=useRouter()
    const supabase=createClientComponentClient()

  async function onSubmit(formData:SignInForm) {
    console.log(formData)
    setIsLoading(true)

    try {
        const {data,error}=await supabase.auth.signInWithPassword({
            email:formData.email,
            password:formData.password
        })
        
        if(!data.user){
            form.setError("email",{message:"Invalid credential"})
            form.setError("password",{message:"Invalid credential"})
            return
        }
        else{
            console.log(data.user)
            router.refresh()
        }
    } catch (error) {
        console.log(error)
        form.setError("password",{message:"Error occured, please try again"})
    }
    finally{
        setIsLoading(false)
    }


    
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
    <Form
     {...form}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                      <div
                        className="relative"
                      >
                        <FormControl>                      
                            <Input 
                                placeholder="Password" 
                                {...field} 
                                type={seePassword?"text":"password"}
                            />
                        </FormControl>

                        <Button
                            type="button"
                            variant={"ghost"}
                            className="absolute right-2 top-0 bottom-0 m-auto p-1 h-min"
                            onClick={()=>setSeePassword(!seePassword)}
                        >
                            {seePassword?(
                            <Eye 
                            size={16}
                            className="stroke-muted-foreground"/>
                            ):(
                            <EyeOff 
                            size={16}
                            className="stroke-muted-foreground"/>
                            )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
            )}
            />

            
          </div>
          <Button 
            disabled={isLoading}>
            {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
            Sign In with Email
          </Button>
        </div>
      </form>
    </Form>
    </div>
  )
}