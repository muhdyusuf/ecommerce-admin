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

export function createUrlFromPath(path:string){
  return `${process.env.NEXT_SUPABASE_STORAGE_BASE_URL}/${path}`
}

export function formatPrice(
  price:number,
  options:{
    currency?:"MYR"|"IDR"|"THB"|"PHP",
    notation?:Intl.NumberFormatOptions["notation"]
  }={}
){
  const {currency="MYR",notation="standard"}=options

  return new Intl.NumberFormat("en-GB",{
    currencyDisplay:"narrowSymbol",
    style:"currency",
    currency,
    notation,
    minimumFractionDigits:2,
    maximumFractionDigits:2
  }).format(price)

}

export function generateInitials(name:string){
  const word=name.split(" ")
  if(word.length===1)return name.slice(0,2)
  return `${word[0].charAt(0)}${word[1].charAt(0)}`
}