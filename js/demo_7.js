fetch('./actions/get_rates.php')
  .then(function(response){
	  return response.json();
  })
  .then(function(data){
	 $("#loader_1").remove();
	 for (let i in data) {
		 let row = $("<tr><td></td><td></td></tr>");
		 $(row).find("td:first-child").text(i);
		 $(row).find("td:nth-child(2)").text(data[i]);
		 $(row).appendTo("#rates table");
	 }
	 
	 let rate = data['BTC/EUR'];
	 
	 return fetch('./actions/get_wallet.php?rate=' + rate.toString());
  })
  .then(function(response) {
		return response.json();
  })
  .then(function(data){
	   $("#loader_2").remove();
	 for (let i in data) {
		 let row = $("<tr><td></td><td></td></tr>");
		 $(row).find("td:first-child").text(i);
		 $(row).find("td:nth-child(2)").text(data[i]);
		 $(row).appendTo("#wallet table");
	 }
  });
