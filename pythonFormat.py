import json

dictFile = json.load(open("dataFiles/dataFile0.txt"))

senatorNames = []
senatorVotingRecord = {}
billLookup = {}

for item in dictFile.keys():
	if item != "rollCallNumber" and item != "billNum" and item != "billDesc" and item != "voteQuestion" and item != "voteDate" and item != "voteResult" and item != "Republican" and item != "Democrat":
		senatorNames.append(item)
		senatorVotingRecord[item] = {}


for item in senatorNames:
	for i in range(287):
		dictFile = json.load(open("dataFiles/dataFile" + str(i) + ".txt"))
		if item in dictFile:
			#print(dictFile)
			senatorVotingRecord[item][dictFile['rollCallNumber']] = dictFile[item]
			billLookup[str(i)] = [dictFile['billNum'], dictFile['billDesc'], dictFile['voteQuestion'], dictFile['voteDate'], dictFile["voteResult"], dictFile["Republican"], dictFile["Democrat"]]
		print("Working on Roll Call:" + str(i) + " " + item) 

with open('dataFiles/senatorDataFile', 'w') as outfile: #use w to create a new file or write over any existing data
	    json.dump(senatorVotingRecord, outfile)
	    json.dump(billLookup, outfile)
	    outfile.write("\n")