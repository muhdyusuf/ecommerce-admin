'use client'
import {FC} from 'react'
import prisma from '../../prisma/client'

interface addProductProps {
 
}

const AddProduct:FC<addProductProps>=({})=>{
    async function handleAddProduct(){
       
    } 


 return(
    <div>
       <button
        onClick={handleAddProduct}
       >
        add product
       </button>
    </div>
)}

export default AddProduct