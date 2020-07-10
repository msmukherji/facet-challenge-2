-- initial schema - just one table, although i first implemented it with two tables, one for assets and one for liabilities

create type balance_type as enum ('asset', 'liability');

create table balance_item... 
	--enforce constraints on types in table??

-- seed some data, separate file?