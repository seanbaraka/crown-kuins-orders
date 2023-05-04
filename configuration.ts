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
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD
    },
    rabbit: {
        url: process.env.RABBIT_URL
    }
})