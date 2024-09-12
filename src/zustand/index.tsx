import { create } from "zustand"
import { persist } from "zustand/middleware"

interface cartType {
   cartItems: { [key: string]: any },
   addCartItem: (item: { [key: string]: any }) => void;
   removeCartItem: (id: number) => void;
   updateCartItem: (id: number, quantityChange: number) => void;
   deleteCart: () => void;
}
export const useCart = create(persist<cartType>(
   (set, get) => ({
      cartItems: { count: 0, items: [] },
      addCartItem: (item: { [key: string]: any }) => {
         const { count, items } = get().cartItems;
         const existingItem = items.find((food: { [key: string]: string }) => food.id === item.id);
         if (existingItem) {
            const updatedCartItems = items.map((cartItem: { [key: string]: string }) =>
               cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
            );
            set(() => ({ cartItems: { count: updatedCartItems.length, items: updatedCartItems } }));
         } else {
            const updatedCartItems = [...items, item];
            set(() => ({ cartItems: { count: updatedCartItems.length, items: updatedCartItems } }));
         }
      },
      removeCartItem: (id: number) => {
         const { count, items } = get().cartItems;

         const index = items.findIndex((item: { [key: string]: any }) => item.id === id);

         // If the item is found, remove it from the array
         if (index !== -1) {
            items.splice(index, 1);
         }
         set(() => ({ cartItems: { count: items.length, items } }));

      },
      updateCartItem: (id: number, quantityChange: number) => {
         const { count, items } = get().cartItems;

         const itemIndex = items.findIndex((item: { [key: string]: any }) => item.id === id);

         if (itemIndex !== -1) {
            const item = items[itemIndex];
            item.quantity += quantityChange;

            // Ensure quantity doesn't go below 1
            item.quantity = Math.max(item.quantity, 1);

            set(() => ({ cartItems: { count, items: [...items] } }));
         } else {
            return items;
         }
      },
      deleteCart: () => {
         set(() => ({ cartItems: { count: 0, items: [] } }));
      }
   }),
   {
      name: "cart-item", // unique name
      // getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
   }
))
