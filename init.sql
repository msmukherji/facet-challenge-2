-- initial schema - just one table, although i first implemented it with two tables, one for assets and one for liabilities
-- ideally this would be part of the startup/deploy script!  i ddi not get that far :(

create type balance_type as enum ('asset', 'liability');


CREATE TABLE balance_item (
  id              SERIAL PRIMARY KEY,
  name 			  VARCHAR(100) NOT NULL,
  balance_type    balance_type NOT NULL,
  amount		  numeric NOT NULL
);


-- seed some data
insert into balance_item (item_name, balance_type, item_balance) values (
	('sample asset', 'asset', 1000.00),
	('sample liability', 'liability', 500.00)
	);