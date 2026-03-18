import datetime as dt
import requests

def kelvin_to_celsius_fahrenheit(temp_kelvin):
    temp_celsius = temp_kelvin - 273.15
    temp_fahrenheit = (temp_kelvin - 273.15) * 9/5 + 32
    return temp_celsius, temp_fahrenheit

BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?'
API_KEY = "f2f0d40bb2beaf83b396318ee2bb419c"


CITY = input('Please Enter Currrent Location?:')
# CITY="Colombo"

url = f"{BASE_URL}q={CITY}&appid={API_KEY}"

response = requests.get(url).json()

temp_kelvin = response['main']['temp']
temp_celsius, temp_fahrenheit = kelvin_to_celsius_fahrenheit(temp_kelvin)

feels_like_kelvin = response['main']['feels_like']
feels_like_celsius, feels_like_fahrenheit = kelvin_to_celsius_fahrenheit(feels_like_kelvin)

wind_speed = response['wind']['speed']
humidity = response['main']['humidity']
description = response['weather'][0]['description']

sunrise_time = dt.datetime.utcfromtimestamp(response['sys']['sunrise'] + response['timezone'])
sunset_time = dt.datetime.utcfromtimestamp(response['sys']['sunset'] + response['timezone'])

print("Current Weather in", CITY)
print("Temperature:", round(temp_celsius, 2), "°C /", round(temp_fahrenheit, 2), "°F")
print("Feels Like:", round(feels_like_celsius, 2), "°C /", round(feels_like_fahrenheit, 2), "°F")
print("Wind Speed:", wind_speed, "m/s")
print("Humidity:", humidity, "%")
print("Description:", description)
print("Sunrise Time:", sunrise_time.strftime('%Y-%m-%d %H:%M:%S'))
print("Sunset Time:", sunset_time.strftime('%Y-%m-%d %H:%M:%S'))
