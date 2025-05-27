const cds = require('@sap/cds');
const fs = require('fs');
const csv = require('csv-parser');

// In-Memory-Datenspeicher
let orders = [];
let orderItems = [];

// CSV-Daten einlesen (beim Serverstart)
function loadCSVData() {
    return new Promise((resolve) => {
        // Orders laden
        fs.createReadStream('data/my.orders-Orders.csv')
            .pipe(csv())
            .on('data', (row) => orders.push({
                ID: row.ID,
                customer: row.customer,
                deliveryDate: row.deliveryDate,
                isShipped: row.isShipped === 'true'
            }))
            .on('end', () => {
                // OrderItems laden
                fs.createReadStream('data/my.orders-OrderItems.csv')
                    .pipe(csv())
                    .on('data', (row) => orderItems.push({
                        ID: row.ID,
                        order_ID: row.order_ID,
                        material: row.material,
                        quantity: parseInt(row.quantity),
                        isPicked: row.isPicked === 'true'
                    }))
                    .on('end', resolve);
            });
    });
}

module.exports = async (srv) => {
    // Daten beim Start laden
    await loadCSVData();

    // Mock für CDS-Read-Operationen
    srv.on('READ', 'Orders', async (req) => {
        return orders.map(order => ({
            ...order,
            Items: orderItems.filter(item => item.order_ID === order.ID)
        }));
    });

    srv.on('READ', 'OrderItems', async (req) => orderItems);

    // Action: Markiere Bestellung als versendet
    srv.on('markAsShipped', async (req) => {
        const { orderID } = req.data;
        const order = orders.find(o => o.ID === orderID);
        
        if (!order) {
            req.error(404, `Order mit ID ${orderID} nicht gefunden`);
        }

        // Prüfe, ob alle Items gepickt sind
        const allItemsPicked = orderItems
            .filter(item => item.order_ID === orderID)
            .every(item => item.isPicked);

        if (!allItemsPicked) {
            req.error(400, "Nicht alle Items wurden gepickt");
        }

        order.isShipped = true;
        return order;
    });
};