import psycopg2
import sys
from datetime import datetime
import time
from calendar import monthrange


start_time = datetime.now()

####################
### TO BE TESTED ###
####################


def computeDailyAverage():
    connection = psycopg2.connect(
        host=sys.argv[1],
        database=sys.argv[2],
        user=sys.argv[3],
        password=sys.argv[4],
        port=sys.argv[5]
    )

    cursor = connection.cursor()
    # Get the day of the first data entry left in the database
    cursor.execute(
        "select extract(day from ts_collection_time) from temperature order by ts_collection_time limit 1")

    day = cursor.fetchone()[0]

    cursor.close()

    cursor = connection.cursor()

    # Select everything from all the tables joining on the collection time, and where the collection day is the same.
    cursor.execute("""select temperature.ts_collection_time, i_temperature_value, i_humidity_value, i_pressure_value, i_aq_value
            from temperature, humidity, pressure, air_quality
            where temperature.ts_collection_time = humidity.ts_collection_time
            and humidity.ts_collection_time = pressure.ts_collection_time
            and pressure.ts_collection_time = air_quality.ts_collection_time
            and extract(day from temperature.ts_collection_time) = %s
            order by temperature.ts_collection_time limit 96""", day)
    db_res = cursor.fetchall()

    # Delete all the data used in the average from the database
    no_of_entries = len(db_res)
    cursor.execute(
        """delete  from temperature where temperature.ts_collection_time in (select temperature.ts_collection_time from temperature order by temperature.ts_collection_time limit %s)""", no_of_entries)
    cursor.execute(
        """delete from humidity where humidity.ts_collection_time in (select humidity.ts_collection_time from humidity order by humidity.ts_collection_time limit %s)""", no_of_entries)
    cursor.execute(
        """delete from pressure where pressure.ts_collection_time in (select pressure.ts_collection_time from pressure order by pressure.ts_collection_time limit %s)""", no_of_entries)
    cursor.execute(
        """delete from air_quality where air_quality.ts_collection_time in (select air_quality.ts_collection_time from air_quality order by air_quality.ts_collection_time limit %s)""", no_of_entries)

    # Initialize and compute averages
    temp_avg = hum_avg = press_avg = aq_avg = 0
    for row in db_res:
        temp_avg += row[1]
        press_avg += row[2]
        hum_avg += row[3]
        aq_avg += row[4]

    day_start_date = db_res[0][0].strftime("%d/%m/%Y")
    temp_avg = temp_avg / no_of_entries
    press_avg = press_avg / no_of_entries
    hum_avg = hum_avg / no_of_entries
    aq_avg = aq_avg / no_of_entries

    # Insert the data into the daily_averages table
    cursor.execute(
        """insert into daily_averages (date_computed_for, i_temperature_avg, i_humidity_avg, i_pressure_avg, i_aq_avg) values (%s, %s, %s, %s, %s)""", (day_start_date, temp_avg, hum_avg, press_avg, aq_avg))
    connection.commit()

    connection.close()
    return db_res[0][0]


def computeWeekyAverage():
    connection = psycopg2.connect(
        host=sys.argv[1],
        database=sys.argv[2],
        user=sys.argv[3],
        password=sys.argv[4],
        port=sys.argv[5]
    )

    cursor = connection.cursor()
    # Get the month of the first daily_average
    cursor.execute(
        "select extract(month from date_computed_for) from daily_averages order by date_computed_for limit 1")

    first_month = cursor.fetchone()[0]
    cursor.close()

    cursor = connection.cursor()
    # Get seven days of data from daily_average making sure all the days are in the same month
    # ---Can return less than seven days---
    cursor.execute("""select date_computed_for, i_temperature_avg, i_humidity_avg, i_pressure_avg, i_aq_avg
            from daily_averages
            where extract(month from date_computed_for) = %s
            order by date_beginned_on limit 7""", first_month)
    db_res = cursor.fetchall()

    no_of_entries = len(db_res)
    # Delete all the data that was retrieved from the database
    cursor.execute(
        """delete from daily_averages where daily_averages.date_computed_for in (select daily_averages.date_computed_for from daily_averages order by daily_averages.date_computed_for limit %s)""", no_of_entries)

    # Initialize and compute averages
    temp_avg = hum_avg = press_avg = aq_avg = 0
    for row in db_res:
        temp_avg += row[1]
        press_avg += row[2]
        hum_avg += row[3]
        aq_avg += row[4]

    week_start_date = db_res[0][0].strftime("%d/%m/%Y")
    temp_avg = temp_avg / no_of_entries
    press_avg = press_avg / no_of_entries
    hum_avg = hum_avg / no_of_entries
    aq_avg = aq_avg / no_of_entries
    # Insert averages into weekly_averages table
    cursor.execute(
        """insert into weekly_averages (date_beginned_on, i_temperature_avg, i_humidity_avg, i_pressure_avg, i_aq_avg) values (%s, %s, %s, %s, %s)""", (week_start_date, temp_avg, hum_avg, press_avg, aq_avg))
    connection.commit()

    connection.close()
    return db_res[0][0]


def computeMonthlyAverage():
    connection = psycopg2.connect(
        host=sys.argv[1],
        database=sys.argv[2],
        user=sys.argv[3],
        password=sys.argv[4],
        port=sys.argv[5]
    )

    cursor = connection.cursor()
    # Get the month of the first weekly_average
    cursor.execute(
        "select extract(month from date_beggined_on) from weekly_averages order by ts_collection_time desc limit 1")

    month = cursor.fetchone()[0]
    cursor.close()

    cursor = connection.cursor()

    # Select all the data from weekly_averages where the month is the same as the one of the first average maximum 5
    cursor.execute("""select date_beggined_on, i_temperature_avg, i_humidity_avg, i_pressure_avg, i_aq_avg
        from weekly_averages 
        where extract(month from date_beginned_on) = %s
        order by date_beggined_on limit 5""", month)
    db_res = cursor.fetchall()
    no_of_entries = len(db_res)
    cursor.execute(
        """delete from weekly_averages where weekly_averages.date_beginned_on in (select weekly_averages.date_beginned_on from weekly_averages order by weekly_averages.date_beginned_on limit %s)""", no_of_entries)

    # Initialize and compute averages
    temp_avg = hum_avg = press_avg = aq_avg = 0
    for row in db_res:
        temp_avg += row[1]
        press_avg += row[2]
        hum_avg += row[3]
        aq_avg += row[4]

    month_start_date = db_res[0][0].strftime("%d/%m/%Y")
    temp_avg = temp_avg / no_of_entries
    press_avg = press_avg / no_of_entries
    hum_avg = hum_avg / no_of_entries
    aq_avg = aq_avg / no_of_entries

    # Insert the averages into monthly_averages
    cursor.execute(
        """insert into monthly_averages (date_month_computed, i_temperature_avg, i_humidity_avg, i_pressure_avg, i_aq_avg) values (%s, %s, %s, %s, %s)""", (month_start_date, temp_avg, hum_avg, press_avg, aq_avg))
    connection.commit()

    connection.close()
    return db_res[0][0]


while True:
    current_time = datetime.now()
    last_daily, last_weekly, last_monthly = current_time
    delta = current_time - start_time
    if(delta.days >= 4 and last_daily.day < current_time):
        last_daily = computeDailyAverage()

    if(delta.days >= 28 and (current_time - last_weekly).days >= 7):
        last_weekly = computeWeekyAverage()

    if(delta.days >= 124 and (current_time - last_monthly).days >= 31):
        last_monthly = computeMonthlyAverage()

    # Sleep for a day
    time.sleep(86400)
