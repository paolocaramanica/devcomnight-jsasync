// Definiamo alcune funzioni
let somma = function(a,b) {
	return a+b;
}

let differenza = function(a,b) {
	return a-b;
}

let prodotto = function(a,b) {
	return a*b;
}

// Definiamo una funzione che accetta tra i parametri una funzione
let operazione = function(op_1, op_2, op) {
	return op(op_1,op_2);
}

let mostraCiao = function() {
	alert('Ciao!');
}

let mostraBuongiorno = function() {
	alert('Buongiorno');
}

let mostraMessaggioCustom = function(messaggio) {
	alert(messaggio);
}

/*
setTimeout(mostraCiao,4000);
setTimeout(mostraBuongiorno,2000);

setTimeout(function(){
	mostraMessaggioCustom('Buon pomeriggio');
},6000);
*/

// Somma asincrona

function somma_async(a,b,cb) {
	let risultato = a+b;
	let attesa = 3000 + (Math.random() * 7000);
	setTimeout(function(){
		cb(risultato);
	},attesa);
}

// Somma in parallelo
let a = [2,4,5,7,8,7];
let b = [4,6,1,2,8,7];
let c = [0,0,0,0,0,0];

/*
for (let i=0; i<a.length; i++)
	somma_async(a[i],b[i],function(somma) {
		c[i] = somma;
		console.log(c);
	}); */
	
let somma_array_async = function(a,b,cb) {
	let num = a.length;
	let somma = [];
	for (let i=0; i<a.length; i++) {
		somma_async(a[i],b[i],function(s) {
			somma[i] = s;
			num--;
			if (num == a.length -1)
				cb(somma);
		});
	}
}

let a_somma = 0;

function Somma(v,cb) {
	if (v.length == 1)
		cb(v[0]);
	else {
		somma_async(v[0],v[1],function(res) {
			v.shift();
			v.shift();
			v.unshift(res);
			Somma(v,cb);
		});
	}
}

Somma(a,alert);






