import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  // Публичный поток для компонентов
  cartItems$ = this.cartItemsSubject.asObservable();

  getItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  addItem(product: Omit<CartItem, 'quantity'>): void {
    const items = this.cartItemsSubject.getValue();
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem) {
      const updatedItems = items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      this.cartItemsSubject.next(updatedItems);
    } else {
      this.cartItemsSubject.next([
        ...items,
        { ...product, quantity: 1 }
      ]);
    }
  }

  removeItem(id: number): void {
    const items = this.cartItemsSubject.getValue();
    this.cartItemsSubject.next(items.filter(item => item.id !== id));
  }

  decreaseItem(id: number): void {
    const items = this.cartItemsSubject.getValue();
    this.cartItemsSubject.next(
      items
        .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)
    );
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}