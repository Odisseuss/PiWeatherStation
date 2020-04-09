import psycopg2
import sys
from datetime import datetime

connection = psycopg2.connect(
    host="localhost",
    database="piweatherstationlocal",
    user="odisseus",
    password="Pneumosuge11"
)
cursor = connection.cursor()

start_time = datetime.now()


cursor.execute(
    "select ts_collection_time from temperature order by ts_collection_time desc limit 1")

last_time = cursor.fetchone()[0]

cursor.close()
delta = last_time - start_time
# if(delta.days >= 4):
cursor = connection.cursor()

cursor.execute("""select temperature.ts_collection_time, i_temperature_value, i_humidity_value, i_pressure_value, i_aq_value
    from temperature, humidity, pressure, air_quality
    where temperature.ts_collection_time = humidity.ts_collection_time
    and humidity.ts_collection_time = pressure.ts_collection_time
    and pressure.ts_collection_time = air_quality.ts_collection_time
    order by temperature.ts_collection_time limit 3""")
db_res = cursor.fetchall()
# cursor.execute(
#     """delete  from temperature where temperature.ts_collection_time in (select temperature.ts_collection_time from temperature order by temperature.ts_collection_time limit 3)""")
# cursor.execute(
#     """delete from humidity where humidity.ts_collection_time in (select humidity.ts_collection_time from humidity order by humidity.ts_collection_time limit 3)""")
# cursor.execute(
#     """delete from pressure where pressure.ts_collection_time in (select pressure.ts_collection_time from pressure order by pressure.ts_collection_time limit 3)""")
# cursor.execute(
#     """delete from air_quality where air_quality.ts_collection_time in (select air_quality.ts_collection_time from air_quality order by air_quality.ts_collection_time limit 3)""")
# connection.commit()
temp_avg = hum_avg = press_avg = aq_avg = 0
for row in db_res:
    temp_avg += row[1]
    press_avg += row[2]
    hum_avg += row[3]
    aq_avg += row[4]
temp_avg = temp_avg / len(db_res)
press_avg = press_avg / len(db_res)
hum_avg = hum_avg / len(db_res)
aq_avg = aq_avg / len(db_res)

connection.close()
