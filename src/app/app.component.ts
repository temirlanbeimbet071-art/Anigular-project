import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartItem, CartService } from './cart.service';

interface CatalogProduct extends Omit<CartItem, 'quantity'> {
  category: string;
  description: string;
  image: string;
  tag: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf],
  templateUrl: './app.component.html'
})
export class AppComponent {
  cartItems$ = this.cartService.cartItems$;
  freeDeliveryLimit = 20000;
  deliveryCost = 1500;
  orderPlaced = false;

  products: CatalogProduct[] = [
    {
      id: 1,
      name: 'Футболка «База»',
      price: 5000,
      category: 'ОДЕЖДА · 100% ХЛОПОК',
      description: 'Та самая, на каждый день',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
      tag: 'БЕСТСЕЛЛЕР'
    },
    {
      id: 2,
      name: 'Худи «Тепло»',
      price: 12000,
      category: 'ОДЕЖДА · МЯГКИЙ ХЛОПОК',
      description: 'Для долгих прогулок',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85',
      tag: 'НОВИНКА'
    },
    {
      id: 3,
      name: 'Кепка «Выходной»',
      price: 3500,
      category: 'АКСЕССУАРЫ · УНИСЕКС',
      description: 'Солнце? Самое время',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85',
      tag: 'ЛЮБИМЧИК'
    }
  ];

  constructor(private cartService: CartService) {}

  addProduct(product: Omit<CartItem, 'quantity'>): void {
    this.orderPlaced = false;
    this.cartService.addItem(product);
  }

  decreaseProduct(id: number): void {
    this.cartService.decreaseItem(id);
  }

  removeProduct(id: number): void {
    this.cartService.removeItem(id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  itemCount(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0);
  }

  subtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  grandTotal(items: CartItem[]): number {
    const subtotal = this.subtotal(items);
    return subtotal + (subtotal >= this.freeDeliveryLimit ? 0 : this.deliveryCost);
  }

  deliveryProgress(items: CartItem[]): number {
    return Math.min(100, (this.subtotal(items) / this.freeDeliveryLimit) * 100);
  }

  checkout(): void {
    if (this.cartService.getItems().length === 0) {
      return;
    }

    this.cartService.clearCart();
    this.orderPlaced = true;
  }
}