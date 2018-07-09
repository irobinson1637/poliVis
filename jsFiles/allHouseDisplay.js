function displayAllStandings(){
	var svgWidth = 500;
	var svgHeight = 6500;
	var rectHeight = 10;
	var senatorObject = JSON.parse(senatorData);
	var billObject = JSON.parse(billData);
	var senatorNameList = Object.keys(senatorObject);
	var allSenators =[];
	var svg = d3.select('body').append('svg')
	.attr("width", svgWidth)
	.attr("height", svgHeight);

	var textSVG = d3.select('body').append('svg')
	.attr("width", svgWidth)
	.attr("height", svgHeight)
	.attr("x", svgWidth);

	var defs = svg.append("defs");
	var linearGradient =  defs.append("linearGradient")
	.attr("id", "linearGradient");
	linearGradient
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "100%")
		.attr("y2", "0%");

	linearGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#1500ff"); //light blue

	linearGradient.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "#ff0000");
	for (t=0; t<senatorNameList.length; t++)
	{
		var selectedSenator=senatorObject[senatorNameList[t]];
		var votingArray = Object.values(selectedSenator);
		var politicalStanding = 0;
		var timesVoted = 0;
		
	/*d3.selectAll('p')
				.data(votingArray)
				.enter()
				.append('p')
				.text(function(d, i){
					if(d === 'Yea' || d === 'Aye') {
						politicalStanding = politicalStanding - (billObject[i][6] - billObject[i][5]);
						timesVoted++;
					}else if (d === 'Nay' || d === 'No'){
						politicalStanding = politicalStanding + (billObject[i][6] - billObject[i][5]);
						timesVoted++;

					}
					return i + " " + d + " " + politicalStanding/timesVoted;
					//return i + ":" + d + " " + billObject[i][0] + " " + billObject[i][1];
				})*/
		for (a=0; a<votingArray.length; a++){
			var temp = votingArray[a];
			if(temp === 'Yea' || temp === 'Aye') {
				politicalStanding = politicalStanding - (billObject[a][6] - billObject[a][5]);
				timesVoted++;
			}else if ( temp === 'Nay' || temp === 'No'){
				politicalStanding = politicalStanding + (billObject[a][6] - billObject[a][5]);
				timesVoted++;
			}
		}

		var normalizedPoliticalStanding = (politicalStanding)/(timesVoted);
		var tStore = senatorNameList[t];
		var senatorStoreObject = {};
		senatorStoreObject[tStore] = normalizedPoliticalStanding;
		allSenators.push(senatorStoreObject);
	}

	//map political standings to be between 0 and one
	var standingStore = [];
	var counter = 0;
	for (var property1 in allSenators){
		counter++;
	};

	for(y=0; y<counter; y++){
		var temp = Object.values(allSenators[y
	]);
		standingStore.push(temp[0]);
	}


	var maxValue = Math.max(...standingStore);
	var minValue = Math.min(...standingStore);
	console.log(maxValue);
	console.log(minValue);
	//((Input - InputLow) / (InputHigh - InputLow)) * (OutputHigh - OutputLow) + OutputLow;

	//var standingNumbers =  Object.values();
	textSVG.selectAll('text')
		.data(allSenators)
		.enter()
		.append('text')
		.attr("y", function(d,i) {return (i*15)+12})
		.text(d => Object.keys(d) + " " + Object.values(d));
	console.log(allSenators);
	alert("ay");

	//index 5 of billObject is republican percentage
	//index 6 of billObject is democrat percentage 
	//index 0 is bill number
	//index 1 is desc
	//index 2 is motion
	//index 3 is voting date
	//index 4 is passed or failed 


	svg.selectAll('rect')
	   .data(allSenators)
	   .enter()
	   .append('rect')
	   .attr("width", svgWidth)
	   .attr("height", rectHeight)
	   .attr('y', function(d,i) {return (i*15)+2})
	   .text("att")
	   .style("fill", "url(#linearGradient)");
    svg.selectAll('circle')
	   .data(allSenators)
	   .enter()

	   .append('circle')
	   .attr("r", rectHeight/2)
	   .attr('cy', function(d,i) {return (i*15)+7})
	   .attr('cx', function(d){
	   		var tempStoreData = Object.values(d);

	   		tempStoreData = ((tempStoreData[0]-minValue)/(maxValue-minValue));


	   		return tempStoreData*svgWidth;
	   });
}

function displaySelectStandings(senName){
	var svgWidth = 500;
	var svgHeight = 6500;
	var rectHeight = 10;
	var senatorObject = JSON.parse(senatorData);
	var billObject = JSON.parse(billData);
	var senatorNameList = Object.keys(senatorObject);
	var allSenators =[];
	var svg = d3.select('body').append('svg')
	.attr("width", svgWidth)
	.attr("height", svgHeight);

	var textSVG = d3.select('body').append('svg')
	.attr("width", svgWidth)
	.attr("height", svgHeight)
	.attr("x", svgWidth);

	var defs = svg.append("defs");
	var linearGradient =  defs.append("linearGradient")
	.attr("id", "linearGradient");
	linearGradient
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "100%")
		.attr("y2", "0%");

	linearGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#1500ff"); //light blue

	linearGradient.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "#ff0000");
	for (t=0; t<senatorNameList.length; t++)
	{
		var selectedSenator=senatorObject[senatorNameList[t]];
		var votingArray = Object.values(selectedSenator);
		var politicalStanding = 0;
		var timesVoted = 0;
		
	/*d3.selectAll('p')
				.data(votingArray)
				.enter()
				.append('p')
				.text(function(d, i){
					if(d === 'Yea' || d === 'Aye') {
						politicalStanding = politicalStanding - (billObject[i][6] - billObject[i][5]);
						timesVoted++;
					}else if (d === 'Nay' || d === 'No'){
						politicalStanding = politicalStanding + (billObject[i][6] - billObject[i][5]);
						timesVoted++;

					}
					return i + " " + d + " " + politicalStanding/timesVoted;
					//return i + ":" + d + " " + billObject[i][0] + " " + billObject[i][1];
				})*/
		for (a=0; a<votingArray.length; a++){
			var temp = votingArray[a];
			if(temp === 'Yea' || temp === 'Aye') {
				politicalStanding = politicalStanding - (billObject[a][6] - billObject[a][5]);
				timesVoted++;
			}else if ( temp === 'Nay' || temp === 'No'){
				politicalStanding = politicalStanding + (billObject[a][6] - billObject[a][5]);
				timesVoted++;
			}
		}

		var normalizedPoliticalStanding = (politicalStanding)/(timesVoted);
		var tStore = senatorNameList[t];
		var senatorStoreObject = {};
		senatorStoreObject[tStore] = normalizedPoliticalStanding;
		allSenators.push(senatorStoreObject);
	}

	//map political standings to be between 0 and one
	var standingStore = [];
	var counter = 0;
	for (var property1 in allSenators){
		counter++;
	};

	for(y=0; y<counter; y++){
		var temp = Object.values(allSenators[y
	]);
		standingStore.push(temp[0]);
	}


	var maxValue = Math.max(...standingStore);
	var minValue = Math.min(...standingStore);
	console.log(maxValue);
	console.log(minValue);
	//((Input - InputLow) / (InputHigh - InputLow)) * (OutputHigh - OutputLow) + OutputLow;

	//var standingNumbers =  Object.values();
	textSVG.selectAll('text')
		.data(allSenators)
		.enter()
		.append('text')
		.attr("y", function(d,i) {return (i*15)+12})
		.text(d => Object.keys(d) + " " + Object.values(d));

	//index 5 of billObject is republican percentage
	//index 6 of billObject is democrat percentage 
	//index 0 is bill number
	//index 1 is desc
	//index 2 is motion
	//index 3 is voting date
	//index 4 is passed or failed 


	svg.selectAll('rect')
	   .data(allSenators['Abraham'])
	   .enter()
	   .append('rect')
	   .attr("width", svgWidth)
	   .attr("height", rectHeight)
	   .attr('y', function(d,i) {return (i*15)+2})
	   .text("att")
	   .style("fill", "url(#linearGradient)");

    svg.selectAll('circle')
	   .data(allSenators)
	   .enter()

	   .append('circle')
	   .attr("r", rectHeight/2)
	   .attr('cy', function(d,i) {return (i*15)+7})
	   .attr('cx', function(d){
	   		var tempStoreData = Object.values(d);

	   		tempStoreData = ((tempStoreData[0]-minValue)/(maxValue-minValue));


	   		return tempStoreData*svgWidth;
	   });
}




