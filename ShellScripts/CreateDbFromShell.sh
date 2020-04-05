psql -c "alter user postgres password 'postgres'"
psql -c "create database piweatherstation"
psql piweatherstation -c "create table datatable (id varchar, temperature varchar, pressure varchar, humidity varchar, gas varchar)"
