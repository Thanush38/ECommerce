// // src/redux/cartSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//
// interface CartItem {
//     id: string;
//     items: Product[];
//
//
// }
//
// interface Product {
//     id: number;
//     name: string;
//     image: string;
//     price: string;
//     size: string,
//     quantity: number;
// }
//
//
//
//
// interface CartState {
//     items: CartItem[];
// }
//
// const initialState: CartState = {
//     items: [],
// };
//
// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         setCart: (state, action: PayloadAction<CartItem[]>) => {
//             state.items = action.payload;
//         },
//         addItem: (state, action: PayloadAction<CartItem>) => {
//             state.items.push(action.payload);
//         },
//         removeItem: (state, action: PayloadAction<{ cartId: string, productId: number }>) => {
//             const cartIndex = state.items.findIndex((cart) => cart.id === action.payload.cartId);
//             if (cartIndex !== -1) {
//                 const productIndex = state.items[cartIndex].items.findIndex((product) => product.id === action.payload.productId);
//                 if (productIndex !== -1) {
//                     state.items[cartIndex].items.splice(productIndex, 1);
//                 }
//             }
//         },
//         clearCart: (state) => {
//             state.items = [];
//         },
//     },
// });
//
// export const { setCart, addItem, removeItem, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;



// src/redux/cartSlice.ts
// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    size: string;
    quantity: number;
}

interface CartItem {
    id: string;
    items: Product[];
}

interface CartState {
    cartItem: CartItem;
}

const initialState: CartState = {
    cartItem: {
        id: 'default', // Provide a default id or fetch it from somewhere
        items: []
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartItem>) => {
            state.cartItem = action.payload;
        },
        addItem: (state, action: PayloadAction<Product>) => {
            state.cartItem.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.cartItem.items = state.cartItem.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItem.items = [];
        },
    },
});

export const { setCart, addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

