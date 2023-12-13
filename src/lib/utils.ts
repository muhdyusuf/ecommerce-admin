import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPathFromUrl(url:string){
  const urlArr=url.split("/")
  const path=urlArr.slice((urlArr.length-2)).join("/")
  return path
}