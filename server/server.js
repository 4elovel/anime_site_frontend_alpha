const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Налаштування порту
const port = process.env.PORT || 3002

// Використання стандартних middleware (logger, static, cors тощо)
server.use(middlewares)

// Використання роутера
server.use(router)

// Запуск сервера
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`)
})