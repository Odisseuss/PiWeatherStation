import numpy as np
db_press = [1015.9, 1015.92, 1015.94, 1015.9, 1015.89, 1015.91, 1015.9, 1015.89, 1015.7, 1015.76, 1015.81,
          1015.87, 1015.91, 1015.90, 1015.93, 1015.91, 1015.87, 1015.89, 1015.88, 1015.91, 1015.92, 1015.94,
          1015.92, 1015.9]
pressure_values = [0.0] * 24
pressure_diff = [0.0] * 24

def TakeActualMeasure():
    read_temp = 12
    read_humi = 12
    read_press = 12
    return read_temp, read_humi, read_press


# Get last 24 values of pressure from db starting from the current time.
def GetDBPressure(db_press):
    for pressureDB in db_press:
        pressure_values = pressureDB


def CalculateTrend():
    trend = float
    weight = 1
    for i in range(len(pressure_diff) - 1):
        if i == 0:
            pressure_diff[i] = (pressure_values[23] - pressure_values[len(pressure_diff)-i-1]) * 1.5
        else:
            pressure_diff[i] = (pressure_values[23] - pressure_values[len(pressure_diff)-i-1]) / weight
            weight += 0.5
    for i in range(len(pressure_diff) - 2):
        pressure_diff[23] += pressure_diff[i]
    pressure_diff[23] = pressure_diff[23]/23

    if pressure_diff[23] > 0.25:
        trend = 1
    elif -0.25 <= pressure_diff[23] <= 0.25 :
        trend = 0
    elif pressure_diff[23] < -0.25:
        trend = -1

    return trend


def Zambretti():
# Elevation calculation based on current value of air pressure and air pressure at sea level (de luat)
    z_trend = CalculateTrend()


def msg(message):
    switcher = {
        'A': 'Settled fine',
        'B': 'Fine weather',
        'C': 'Becoming fine',
        'D': 'Fine, becoming less settled',
        'E': 'Fine, possible showers',
        'F': 'Fairly fine, improving',
        'G': 'Fairly fine, possible showers early',
        'H': 'Fairly fine, showery later',
        'I': 'Showery early, improving',
        'J': 'Changeable, mending',
        'K': 'Fairly fine, showers likely',
        'L': 'Rather unsettled clearing later',
        'M': 'Unsettled, probably improving',
        'N': 'Showery, bright intervals',
        'O': 'Showery, becoming less settled',
        'P': 'Changeable, some rain',
        'Q': 'Unsettled, short fine intervals',
        'R': 'Unsettled, rain later',
        'S': 'Unsettled, some rain',
        'T': 'Mostly very unsettled',
        'U': 'Occasional rain, worsening',
        'V': 'Rain at times, very unsettled',
        'W': 'Rain at frequent intervals',
        'X': 'Rain, very unsettled',
        'Y': 'Stormy, may improve',
        'Z': 'Stormy, much rain'
    }
    return switcher.get(message, "Error")


def main():
    letter = input("Type letter:")
    print(msg(letter))


