namespace my.orders;

entity Orders {
    key ID           : UUID;
        customer     : String;
        deliveryDate : Date;
        isShipped    : Boolean default false;
        Items        : Composition of many OrderItems
                           on Items.order = $self;
}

entity OrderItems {
    key ID       : UUID;
        order    : Association to Orders;
        material : String;
        quantity : Integer;
        isPicked : Boolean default false;
}
