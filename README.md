# ilecsy-client

[Ilecsy](https://ilecsy.web.app/) - a single page full stack web application for B2C based product sell.

[Client code](https://github.com/GitByImran/ilecsy-client) | [Server code](https://github.com/GitByImran/ilecsy-server) | [Live link](https://ilecsy.web.app/)

###Guest routes - 
1. *Home* - Category based product choose, add to cart, details option
2. *Call to Action* - Direct call to customer care
3. *My cart* - Selected product will show here, user can select quantity per product from here, here is make payment button which will route to checkout page.

###Authentication routes - 
Sign In, Create an Account as Sign Up.

###Authorization routes - 

1. *User* : Profile, 
2. *My Cart* - selected product management, quantity manage, create payment intent.
3. *Make Payment* (dynamic) - create payment.
4. *My Orders* - observe ordered and paid product.
5. *Payment History* - observe payment details history.

###Admin : 
1. *Profile*, 
2. *Manage Users* - user management, make user admin or user , delete account as restriction.
3. *Manage Products* - available product management, update or delete product.
4. *Add Products* - add new product, image uploader applied.
5. *All Orders* - orderd product management, deliverd or pending state control, sorting system applied.

###Features - 

>**Authentication** - Firebase integrity

>**Athorization** - User role based

>**CRUD operation** - Mongodb based

>**Payment** - Stripe (card based)

>**Image Upload** - imgbb api integrated

###Technology Used - 
ReactJs, ExpressJs, MongoDb, Material UI, React Components, Firebase, Vercel, Stripe.

###Hosting - 
**Client side** : Firebase
**Server side** : Vercel

>***Version - 1.0 (first release)***