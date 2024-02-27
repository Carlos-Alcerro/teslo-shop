import type { CartProduct } from "@/interfaces/product.interface";
import { create } from 'zustand';
import {persist} from 'zustand/middleware'


interface State{
    cart:CartProduct

    getTotalItems:()=>number

    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        Total: number;
        itemInCart: number;
    }

    addProductToCart:(product:CartProduct)=>void

    updateProductToCart:(product:CartProduct,quantity:number)=>void

    deleteProductInCart:(product:CartProduct)=>void
}

export const useCartStore=create<State>()(
    persist(
        (set,get)=>({
            cart:[],
        
            getTotalItems:()=>{
                const {cart} =get()
                return cart.reduce((total,item)=>total+item.quantity,0)
            },

            getSummaryInformation:()=>{
                const {cart} = get()
                const subTotal = cart.reduce((subTotal,product)=>product.quantity*product.price+subTotal,0)
                const tax = subTotal*0.15;
                const Total = subTotal+tax;
                const itemInCart= cart.reduce((total,item)=>total+item.quantity,0)

                return {
                    subTotal,
                    tax,
                    Total,
                    itemInCart
                }
            },


        
            addProductToCart:(product:CartProduct)=>{
                const {cart} = get()
        
                //revisar si el producto existe con la talla seleccionada
                const productInCart = cart.some(
                    (item)=>(item.id === product.id && item.size === product.size)
                );
        
                if(!productInCart){
                    set({cart:[...cart,product]});
                    return;
                }
        
                // se que el producto existe por talla, tengo que actualizar la cantudad
                const updateCartProducts= cart.map((item)=>{
                    if(item.id === product.id && item.size === product.size){
                        return {...item,quantity:item.quantity+product.quantity}
                    }
                    return item;
                })
                set({cart:updateCartProducts})
            },
            updateProductToCart:(product:CartProduct,quantity:number)=>{
                const {cart} = get()
                const updateCartProduct=cart.map(item=>{
                    if(item.id === product.id && item.size === product.size){
                        return{...item,quantity:quantity}
                    }
                    return item;
                });

                set({cart:updateCartProduct})
                
            },
            deleteProductInCart:(product:CartProduct)=>{
                const {cart} = get()
                const deleteProduct=cart.filter((item)=>item.id !==product.id || item.size !== product.size)
                set({cart:deleteProduct})
            }
        })
        ,{
            name:'shopping-cart'
        }
    )
)