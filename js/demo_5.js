// Array dati: si assumono della stessa lunghessa
let a = [3,6,5,7,8];
let b = [8,2,9,9,5];

let n_dati = a.length; // lunghezza

// Creazione tabella e popolamento con i dati iniziali
(function() {
	for (let i=0; i<n_dati; i++) {
		let row = $("<tr><td></td><td></td><td></td></tr>");
		$(row).find("td:first-child").text(a[i]);
		$(row).find("td:nth-child(2)").text(b[i]);
		$(row).find("td:nth-child(3)").text('0');
		$(row).appendTo("table");
	}

	let row = $("<tr><td></td><td></td><td></td></tr>");
	$(row).find("td:first-child").text('0');
	$(row).find("td:nth-child(2)").text('0');
	$(row).find("td:nth-child(3)").text('0');
	$(row).appendTo("table");
})();

/* Somma tra due numeri eseguita in modo asincrono:
calcola il risultato di x + y e, appena è pronto, chiama callback passandoglielo */
function somma_async(x,y,callback) {
	let risultato =  x + y;
	let attesa = 3000 + (Math.random() * 4000);
	setTimeout(function(){
		callback(risultato);
	},attesa);
}

let somma = []; // somma dei due array elemento per elemento
let somma_1; // somma degli elementi del primo array
let somma_2; // somma degli elementi del secondo array
let somma_tot; // somma totale (tutti gli elementi dei due array)

for (let i=0; i<n_dati; i++) {
	somma_async(a[i],b[i],function(res) {
		somma[i] = res;
		$("tr:nth-child(" + (i+2).toString() + ") td:nth-child(3)").text(res);
	});
}

let somma_array = function(v,cb) {
	if (v.length == 1)
		cb(v[0]);
	else {
		somma_async(v[0],v[1],function(res) {
			v.shift();
			v.shift();
			v.unshift(res);
			somma_array(v,cb);
		});
	}
}

somma_array(a,function(r){
	somma_1 = r;
	$("tr:nth-child(" + (n_dati + 2).toString() + ") td:first-child").text(r);
	if (typeof somma_2 != 'undefined')
		somma_async(somma_1,somma_2, function(r){
			somma_tot = r;
			$("tr:nth-child(" + (n_dati + 2).toString() + ") td:nth-child(3)").text(r);
		});
});

somma_array(b,function(r){
	somma_2 = r;
	$("tr:nth-child(" + (n_dati + 2).toString() + ") td:nth-child(2)").text(r);
	if (typeof somma_1 != 'undefined')
		somma_async(somma_1,somma_2, function(r){
			somma_tot = r;
			$("tr:nth-child(" + (n_dati + 2).toString() + ") td:nth-child(3)").text(r);
		});
});

/*
somma_async(a[0],a[1],function(res){
	somma_async(res,a[2],function(res){
		somma_async(res,a[3],function(res){
			somma_async(res,a[4],function(res){
				$("tr:nth-child(" + (n_dati + 2).toString() + ") td:first-child").text(res);
				console.log(res);
			});
		});
	});
});
*/
