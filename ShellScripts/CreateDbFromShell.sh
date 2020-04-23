# Set a password for the db 'postgres' user
psql -c "alter user postgres password 'postgres'"
# Create the database
psql -c "create database piweatherstation"
# Create the sensor table
psql piweatherstation -c "create table sensors (t_sensor_type varchar(12) primary key)"
# Insert the sensor names into the sensors table
psql piweatherstation -c "insert into sensors (t_sensor_type) values ('temperature'),('humidity'),('pressure'),('air quality')"
# Create a table for each of the sensor where to insert the readings
psql piweatherstation -c "create table temperature (ts_collection_time timestamp primary key, i_temperature_value smallint)"
psql piweatherstation -c "create table humidity (ts_collection_time timestamp primary key, i_humidity_value smallint)"
psql piweatherstation -c "create table pressure (ts_collection_time timestamp primary key, i_pressure_value smallint)"
psql piweatherstation -c "create table air_quality (ts_collection_time timestamp primary key, i_aq_value smallint)"
# Create table for each of the average types where to insert the values
psql piweatherstation -c "create table daily_averages (date_computed_for date primary key, i_temperature_avg smallint, i_humidity_avg smallint, i_pressure_avg smallint, i_aq_avg smallint)"
psql piweatherstation -c "create table weekly_averages (date_beginned_on date primary key, date_ended_on date, i_temperature_avg smallint, i_humidity_avg smallint, i_pressure_avg smallint, i_aq_avg smallint)"
psql piweatherstation -c "create table monthly_averages (date_month_computed date primary key, i_temperature_avg smallint, i_humidity_avg smallint, i_pressure_avg smallint, i_aq_avg smallint)"
