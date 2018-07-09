import requests 
import json
from bs4 import BeautifulSoup
#make sure to sudo apt-get install BeautifulSoup4
for i in range(287):
	#rollCallNumber = input("Enter Roll Call vote Number: ") 
	rollCallNumber = str(i+1) #i
	#voteYear = input("Enter Year: ")
	voteYear = "2018"
	if (int(rollCallNumber) < 10):
		page = requests.get("http://clerk.house.gov/evs/"+voteYear+"/roll00" +rollCallNumber+".xml")
	elif (int(rollCallNumber) < 100):
		page = requests.get("http://clerk.house.gov/evs/"+voteYear+"/roll0" +rollCallNumber+".xml")
	else:
		page = requests.get("http://clerk.house.gov/evs/"+voteYear+"/roll" +rollCallNumber+".xml")
	#page = requests.get("http://clerk.house.gov/evs/2018/roll099.xml")
	soup = BeautifulSoup(page.content, 'lxml')
	#print(page.status_code)
	soup_pretty = soup.prettify()
	#print(soup_pretty)
	voteRecord = {}
	statisticalVotingData = {} #used for calculating percent for/against
	legislatorVotingRecord = {}

	objectArray =  soup.find_all('recorded-vote')
	voteRecord["rollCallNumber"] = rollCallNumber
	voteRecord["billNum"] = soup.find('legis-num').get_text()
	voteRecord["billDesc"] = soup.find('vote-desc').get_text()
	voteRecord["voteQuestion"] = soup.find('vote-question').get_text()
	voteRecord["voteDate"] = soup.find('action-date').get_text()
	voteRecord["voteResult"] = soup.find('vote-result').get_text()
	
	party = soup.find_all('totals-by-party')

	for item in party:
		partyName = item.find('party').get_text()
		partyYeahTotal = int(item.find('yea-total').get_text())
		partyNayTotal = int(item.find('nay-total').get_text())
		partyPresentTotal = int(item.find('present-total').get_text())
		voteSum = partyYeahTotal + partyPresentTotal +partyNayTotal
		if (voteSum != 0):
			statisticalVotingData[partyName] = partyYeahTotal/voteSum
		else:
			statisticalVotingData[partyName] = 0
	voteRecord["Republican"] = statisticalVotingData['Republican']
	voteRecord["Democrat"] = statisticalVotingData['Democratic']


	for item in objectArray:
		voteRecord[item.find('legislator').get_text()] = item.find('vote').get_text()

	#print(voteRecord)
	with open('dataFiles/dataFile' + str(i) + '.txt', 'w') as outfile: #use w to create a new file or write over any existing data
	    json.dump(voteRecord, outfile)
	    outfile.write("\n")

	print(i)