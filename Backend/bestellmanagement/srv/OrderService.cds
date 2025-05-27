using my.orders from '../db/schema';

service OrderService {
    entity Orders as projection on orders.Orders;
    entity OrderItems as projection on orders.OrderItems;

    // Action: Markiere Bestellung als versendet
    action markAsShipped(orderID: UUID) returns Orders;
}