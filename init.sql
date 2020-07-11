-- initial schema - just one table, although i first implemented it with two tables, one for assets and one for liabilities

create type balance_type as enum ('asset', 'liability');

create table money.balance_item (item_name varchar, item_balance_type balance_type, item_balance numeric(100, 2),
primary key (balance_item_id));

alter table balance_item rename column balance_item_id to item_id;

-- seed some data
insert into balance_item (item_name, balance_type, item_balance) values (
	('sample asset', 'asset', 1000.00),
	('sample liability', 'liability', 500.00)
	);