const game = new UI
const inventory = []
const shop = []

data.forEach(data => shop.push(data))
fillShop(shop)

game.start()
console.log(shop)