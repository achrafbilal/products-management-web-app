# products-management-web-app

Product management web app built using React + Redux + JsonServer.

## How to run the app

1.  First Clone the app into your local repository
2.  Run `npm install -g json-server` in your terminal ,it may need administrator privileges
3.  open new terminal with the same project path and run `json-server --watch db.json`,this will create a rest server at http://localhost:3000
4.  Run `npm install` in the terminal with project path, 
5.  Run `npm start` you'll bes asked to type `Y` in order to listen for another port and by default it will be served at http://localhost:3001 if the port `3001` is not taken
6.  Enjoy your app

## How to use the app as an Administrator

1.  Login using `admin@mail.com` and 'password' as credentials to login as an Administrator
2.  Add products by clicking on the 'Add product' link in the navbar
3.  After Saving the product you can check the products in the `Products` link in the navbar

## How to use the app as a Client

1.  Login using `client@mail.com` and 'password' as credentials to login as a Client
2.  You can see all the products and add some products to your cart bt clicking the `Add to cart` button
3.  You can view your cart by clicking on the `Cart` link in the navbar
4.  You can delete products from your cart by clicking the `Delete from cart` button
5.  And finally you can go to chekout by clicking the `Checkout` button in top right corner
