# bamazon

The purpose of this application is to allow customers and store managers access to the store's database. Customers can see what products are available to purchase and then, make a purchase.

Managers can view a store's entire inventory, check for when stock is low, replenish the stock and even add new products. 

## Store Database

The store database has 5 columns: a unique id for each product, product name, product department, product price, and quantity in stock.

<insert pic of store table>

Depending on if you're a customer or a manager, you're allowed certain access to information on this database.

### Customer access

When accessing the application, the customer is first shown a product table that will display all of the items available for purchase. 

<insert pic of customer table view>

The customer is then sent a prompt: *"Please choose the ID of the product you would like to purchase."*
Once the customer has chosen the product, another prompt is sent: *"Please enter the quantity you would like to purchase."*

Once entered, the inventory will be checked to see if there is enough inventory on hand to complete the customer order. If not, the customer will be prompted with the message: *"Insufficient quantity on hand. Please try ordering a smaller amount."*

Once the customer has chosen a new quantity that can be filled, the database will be updated with the "after purchase" quantity on hand and the customer will receive a message telling them the total price of their purchase.

### Store Managerial access

When accessing the application, a manager is shown a menu with four options:

1. **View Products for Sale** - the application will list every available item in the database

2. **View Low Inventory** - a list all items with an inventory count lower than five is displayed

3. **Add to Inventory** - the application will display a prompt that will let the manager increase the quantity of any
   product currently on hand

4. **Add New Product** - the application will allow the manager to add a new product to the store database







