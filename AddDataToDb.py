#!/usr/bin/env python

import bme680
import time
import psycopg2
import sys
from datetime import datetime

print("""AddDataToDb.py - Displays temperature, pressure, humidity, and gas and inserts them into a postgres db

Press Ctrl+C to exit!

""")


try:
    sensor = bme680.BME680(bme680.I2C_ADDR_PRIMARY)
except IOError:
    sensor = bme680.BME680(bme680.I2C_ADDR_SECONDARY)

# These calibration data can safely be commented
# out, if desired.

print('Calibration data:')
for name in dir(sensor.calibration_data):

    if not name.startswith('_'):
        value = getattr(sensor.calibration_data, name)

        if isinstance(value, int):
            print('{}: {}'.format(name, value))

# These oversampling settings can be tweaked to
# change the balance between accuracy and noise in
# the data.

sensor.set_humidity_oversample(bme680.OS_2X)
sensor.set_pressure_oversample(bme680.OS_4X)
sensor.set_temperature_oversample(bme680.OS_8X)
sensor.set_filter(bme680.FILTER_SIZE_3)
sensor.set_gas_status(bme680.ENABLE_GAS_MEAS)

print('\n\nInitial reading:')
for name in dir(sensor.data):
    value = getattr(sensor.data, name)

    if not name.startswith('_'):
        print('{}: {}'.format(name, value))

sensor.set_gas_heater_temperature(320)
sensor.set_gas_heater_duration(150)
sensor.select_gas_heater_profile(0)

# Up to 10 heater profiles can be configured, each
# with their own temperature and duration.
# sensor.set_gas_heater_profile(200, 150, nb_profile=1)
# sensor.select_gas_heater_profile(1)

print('\n\nPolling:')
try:
    while True:
        if sensor.get_sensor_data():
            output = '{0:.2f} C,{1:.2f} hPa,{2:.2f} %RH'.format(
                sensor.data.temperature,
                sensor.data.pressure,
                sensor.data.humidity)

            if sensor.data.heat_stable:
                print('{0},{1} Ohms'.format(
                    output,
                    sensor.data.gas_resistance))
                connection = psycopg2.connect(
                    host=sys.argv[1],
                    database=sys.argv[2],
                    user=sys.argv[3],
                    password=sys.argv[4],
                    port=sys.argv[5]
                )
                cursor = connection.cursor()
                current_time = datetime.now()
                cursor.execute("insert into data (id, temperature, pressure, humidity, gas) values (%s, %s, %s, %s, %s)", (current_time.strftime(
                    "%d/%m/%Y %H:%M:%S"), str(sensor.data.temperature), str(sensor.data.pressure), str(sensor.data.humidity), str(sensor.data.gas_resistance)))
                connection.commit()
                cursor.close()
                connection.close()

            else:
                print(output)

        time.sleep(1)


except KeyboardInterrupt:
    pass
