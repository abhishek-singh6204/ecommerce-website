const paypal=require('paypal-rest-sdk');

paypal.configure({
    mode:'sandbox',
    // client_id:'AeOQ53gFkmOFmc8rSDc3yhp6GJ82MJxc-yb3uFgOWtXcWoKDmEoa5BihznCfoh2zeNzIEpvszsctiMCb',
    // client_secret:'EBVYh50pfl-kkVyg7uACjVs1ad5Ik81tO0Pe_IQoGs1G9h-LEqAemR9_JTyhXojdJQZcO5VklUzJdERF'
    client_id:process.env.PAYPAL_CLIENT_ID,
    client_secret:process.env.PAYPAL_CLIENT_SECRET
})

module.exports=paypal;