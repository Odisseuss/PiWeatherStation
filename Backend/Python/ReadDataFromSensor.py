#!/usr/bin/env python

import bme680
import time
from datetime import datetime


def ReadDataFromSensor():
    try:
    sensor = bme680.BME680(bme680.I2C_ADDR_PRIMARY)

    except IOError:
        sensor = bme680.BME680(bme680.I2C_ADDR_SECONDARY)

    sensor.set_humidity_oversample(bme680.OS_2X)
    sensor.set_pressure_oversample(bme680.OS_4X)
    sensor.set_temperature_oversample(bme680.OS_8X)
    sensor.set_filter(bme680.FILTER_SIZE_3)
    sensor.set_gas_status(bme680.ENABLE_GAS_MEAS)

    sensor.set_gas_heater_temperature(320)
    sensor.set_gas_heater_duration(150)
    sensor.select_gas_heater_profile(0)

    try:
        while True:
            if sensor.get_sensor_data():
                current_time = datetime.now()
                output = '{0},{1:.2f} C,{2:.2f} hPa,{3:.2f} %RH'.format(
                    current_time.strftime(
                        "%Y-%m-%d %H:%M:%S"),
                    sensor.data.temperature,
                    sensor.data.pressure,
                    sensor.data.humidity)

                if sensor.data.heat_stable:
                    print('{0},{1} Ohms'.format(
                        output,
                        sensor.data.gas_resistance))

            time.sleep(300)

    except KeyboardInterrupt:
        pass
