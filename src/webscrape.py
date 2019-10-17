import requests
from bs4 import BeautifulSoup

# inputs: websiteurl
websiteurl = 'https://www.247tickets.com/t/rolling-loud-hong-kong'

req = requests.get(websiteurl)
soup = BeautifulSoup(req.text, 'html.parser')

priceSoup = soup.find("div", "_2VJBY clearBoth clearBoth").find("span");
price = priceSoup.text.strip()



dateSoup = soup.select("div[class=ZhAas]")
dateList = [] 

for texts in dateSoup:
	datesFound = texts.find("span")
	if (datesFound):
		if (datesFound.text.strip() == "Date:"):
			dateList = datesFound.next.next.next.findAll("span")
			startDate = dateList[0].text.strip()
			endDate = dateList[0].text.strip()
			if (len(dateList) == 2):
				endDate = dateList[1].text.strip()


venueSoup = soup.select("div[class=ZhAas]")

for texts in venueSoup:
  venuesFound = texts.find("span")
  if (venuesFound):
    if (venuesFound.text.strip() == "Venue:"):
      venuesFound.next.next.find('div', "_3iD-9").decompose()
      venue = venuesFound.next.next.text.strip()
      break

print (startDate,"-", endDate)
print (price)
print (venue)