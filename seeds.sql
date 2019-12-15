USE bamazon;

INSERT INTO department(department_name, over_head_costs) VALUES ('Electronics', 10000), ('Clothing', 60000);
INSERT INTO product (product_name, department_id, price, stock_quantity, product_sales) VALUES ('Gameboy', 1 , 50, 2000, 0),('Switch', 1, 50, 2000, 0), ('Atari', 1, 50, 2000, 0),('Your own imagination', 1, 50, 2000, 0), ('Hats', 2, 75, 2000, 0), ('Shoes', 2, 75, 2000, 0), ('Belts', 2, 75, 2000, 0), ('Socks', 2, 75, 2000, 0), ('Gloves', 2, 75, 2000, 0);