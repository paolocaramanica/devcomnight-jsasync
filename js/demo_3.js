
let xhr = new XMLHttpRequest();
xhr.open('GET',"./actions/get_rates.php");
xhr.send();
xhr.onload = function(){
	let data = JSON.parse(xhr.response);
	$("#loader_1").remove();
		for (let c in data) {
			let row = $("<tr><td></td><td></td></tr>");
			$(row).find("td:first-child").text(c);
			$(row).find("td:nth-child(2)").text(data[c]);
			$(row).appendTo("#rates table");
		}
			
	let rate = data['BTC/EUR'];
	
	let xhr2 = new XMLHttpRequest();
	xhr2.open('GET',"./actions/get_wallet.php?rate=" + rate);
	xhr2.send();
	xhr2.onload = function() {
		let data2 = JSON.parse(xhr2.response);
		$("#loader_2").remove();
			for (let c in data) {
				let row = $("<tr><td></td><td></td></tr>");
				$(row).find("td:first-child").text(c);
				$(row).find("td:nth-child(2)").text(data[c] + ' €');
				$(row).appendTo("#wallet table");
		}
	}
}