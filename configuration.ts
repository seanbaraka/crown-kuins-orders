export default () => ({
    orders: {
        port: process.env.ORDERS_HTTP_PORT,
        microservice: {
            port: process.env.ORDERS_TCP_PORT,
            host: process.env.ORDERS_TCP_HOST
        }
    },
    payments: {
        port: process.env.PAYMENTS_HTTP_PORT,
        microservice: {
            port: process.env.PAYMENTS_TCP_PORT,
            host: process.env.PAYMENTS_TCP_HOST
        }
    }
})