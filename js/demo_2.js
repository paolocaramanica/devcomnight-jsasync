

let xhr = new XMLHttpRequest();
xhr.open('GET',"./actions/get_rates.php");
xhr.send();
xhr.onload = function() {
	let data = JSON.parse(xhr.response);
	$("#loader").remove();
	for (let c in data) {
		let row = $("<tr><td></td><td></td></tr>");
		$(row).find("td:first-child").text(c);
		$(row).find("td:nth-child(2)").text(data[c]);
		$(row).appendTo("#rates table");
	}
}