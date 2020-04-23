import requests
# Get location's sea level pressure from api
api_key = "1db0233e1c450fc5daeba18dcb9c25d1"
city = "Bucharest"
country = "ro"
request_string = "https://api.openweathermap.org/data/2.5/weather?q={},{}&appid={}".format(city, country, api_key)
data = requests.get(request_string)
json_res = data.json()
sea_pressure = json_res['main']['pressure']
# Dummy data TO BE DELETED
current_month = 3
pressure_diff = [0.0] * 24
# Get last 24 values of pressure from db starting from the current time.
db_press = [1013.11, 1013.11, 1013.14, 1013.14, 1013.15, 1013.20, 1013.24, 1013.24, 1013.24, 1013.43, 1013.42,
          1013.40, 1013.45, 1013.42, 1013.44, 1013.14, 1013.20, 1013.24, 1013.43, 1013.11, 1013.40, 1013.40,
          1013.40, 1013.45]


def CalculateTrend(pressure_diff, pressure_values):
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


def zambretti_forecast(api, city_api, country_api, sea_pressure, current_month, pressure_diff, pressure_values):
    # Elevation calculation based on current value of air pressure and air pressure at sea level (de luat)
    z_trend = CalculateTrend(pressure_diff, pressure_values)
    z_letter = ""
    zambretti = is_summer_winter_month(current_month)
    print(zambretti)
    # Case trend falling
    if z_trend == -1:
        zambretti += 130 - 0.12 * sea_pressure
        z_letter = switch_trend_falling(round(zambretti))
#     # Case trend steady
    if z_trend == 0:
        zambretti += 138 - 0.13 * sea_pressure
        z_letter = switch_trend_steady(round(zambretti))
    # Case trend rising
    if z_trend == 1:
        zambretti += 160 - 0.16 * sea_pressure
        z_letter = switch_trend_rising(round(zambretti))

    # Zambretti's letter
    print(round(zambretti))
    print(z_letter)
    return msg(z_letter)


def is_summer_winter_month(month):
    season_correction = 0
    if month == 12 or month <= 2:
        season_correction = -1
    elif 6 <= month <= 8:
        season_correction = 1
    return season_correction


def switch_trend_falling(value):
    switcher = {
        0: 'A',
        1: 'A',
        2: 'B',
        3: 'D',
        4: 'H',
        5: 'O',
        6: 'R',
        7: 'U',
        8: 'V',
        9: 'X'
    }
    return switcher.get(value, "Error zambretti value")


def switch_trend_steady(value):
    switcher = {
        0: 'A',
        1: 'A',
        2: 'B',
        3: 'E',
        4: 'K',
        5: 'N',
        6: 'P',
        7: 'S',
        8: 'W',
        9: 'X',
        10: 'Z'
    }
    return switcher.get(value, "Error zambretti value")


def switch_trend_rising(value):
    switcher = {
        0: 'A',
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'F',
        5: 'G',
        6: 'I',
        7: 'J',
        8: 'L',
        9: 'M',
        10: 'Q',
        11: 'T',
        12: 'Y',
        13: 'Z',
    }
    return switcher.get(value, "Error zambretti value")


def msg(letter):
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
    return switcher.get(letter, "Error msg")


print(zambretti_forecast(api_key, city, country, sea_pressure, current_month, pressure_diff, db_press))
