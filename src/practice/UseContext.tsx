/**
 * 2. 요구사항
- 같은 상품을 다시 담으면 기존 상품의 수량이 1 증가합니다.
- 수량 감소 버튼을 눌러 수량이 0이 되면 해당 상품을 제거합니다.
- 삭제 버튼은 수량과 관계없이 해당 상품을 제거합니다.
- CartBadge는 상품 종류 수가 아닌 수량의 합계를 표시합니다.
- CartTotal은 가격 × 수량의 합계를 표시합니다.
- 전체 비우기를 누르면 장바구니가 빈 상태가 됩니다.
 */

import { createContext, useContext, useReducer } from 'react';

export const products = [
  { id: 1, name: '키보드', price: 50000 },
  { id: 2, name: '마우스', price: 30000 },
  { id: 3, name: '모니터', price: 200000 },
];

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // TODO: 두 Context로 cart와 dispatch를 제공하세요.
  return (
    <CartContext value={cart}>
      <CartDispatchContext value={dispatch}>{children}</CartDispatchContext>
    </CartContext>
  );
}

export function useCart() {
  // TODO: 장바구니 state를 반환하세요.
  return useContext(CartContext);
}

export function useCartDispatch() {
  // TODO: dispatch를 반환하세요.
  return useContext(CartDispatchContext);
}

//cart = { id, name, price, quantity }[]
function cartReducer(cart, action) {
  switch (action.type) {
    case 'added': {
      // action.product: 담을 상품
      // TODO: 기존 상품이면 수량 증가, 없으면 수량 1로 추가
      const isInclude = cart.some((item) => item.id === action.product.id);

      if (isInclude) {
        return cart.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...cart, { ...action.product, quantity: 1 }];
      }
    }
    case 'decreased': {
      // action.id: 수량을 줄일 상품 ID
      // TODO: 수량 감소. 0이 되면 제거
      const result = cart.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item,
      );
      return result.filter((item) => item.quantity !== 0);
    }
    case 'removed': {
      // action.id: 삭제할 상품 ID
      // TODO: 해당 상품 제거
      return cart.filter((item) => action.id !== item.id);
    }
    case 'cleared': {
      // TODO: 전체 비우기
      return [];
    }
    default:
      throw Error('알 수 없는 action: ' + action.type);
  }
}
