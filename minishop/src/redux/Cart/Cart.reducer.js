import {
    CART_GET_LOADING,
    CART_GET_SUCCESS,
    CART_GET_ERROR,
    CART_UPDATE_DATA,
    CART_REMOVE
} from "./Cart.actionTypes"

let initialState = {
    loading:false,
    error:false,
    cartData:[],
    totalPrice:0,
}

export const cartReducer = (state = initialState ,{type,payload})=>{
    switch(type){
        case  CART_GET_LOADING:{
            return {
                ...state,
                loading:true
            }
        }
        case  CART_GET_ERROR:{
            return {
                ...state,
                loading:false,
                error:true,
            }
        }

        case  CART_GET_SUCCESS:{
            let sum = payload.reduce(
                (acc, el) => acc + (+el.price+152) * el.qty,
                0
            )
            return {
                ...state,
                loading:false,
                cartData:payload,
                totalPrice: sum
            }
        }

        case CART_UPDATE_DATA:{

            const updateValue = state.cartData.map((cart) =>{
                if( cart.id === payload.id){
                    cart.qty = payload.qty
                }
                return cart;
            })

            return {
                ...state,
                cartData: updateValue
            }  
        }

        case CART_REMOVE:{
            return {
                ...state,
                cartData:state.cartData.filter((cart)=> cart.id !== payload.id)
            }
        }

        default : {
            return state;
        }
    }
}