/* Somma tra due numeri eseguita in modo asincrono:
calcola il risultato di x + y e, appena è pronto, chiama callback passandoglielo */
function somma_async(x,y,callback) {
	let risultato =  x + y;
	let attesa = 3000 + (Math.random() * 4000);
	setTimeout(function(){
		callback(risultato);
	},attesa);
}

function prod_async(x,y,callback) {
	let risultato = x*y;
	let attesa = 3000 + (Math.random() * 4000);
	setTimeout(function(){
		callback(risultato);
	}, attesa);
}

let a = 8;
let b = 9;
let c = 12

// sommare a e b, moltiplicare per c il risultato, sommare 12, moltiplicare per 2 e stampare
somma_async(a,b,function(r) {
	prod_async(r,c,function(r) {
		somma_async(r,12,function(r) {
			prod_async(r,2,function(r) {
				console.log(r);
			});
		});
	});
});

// Evitare la callback hell
somma_async(a,b,function(r) {
	step_2(r,c);
});

function step_2(d,f) {
	prod_async(d,f,function(r) {
		step_3(r);
	});
}

function step_3(g) {
	somma_async(g,12,function(r) {
		step_4(r);
	});
}

function step_4(h) {
	prod_async(h,2,function(r) {
		console.log(r);
	});
}

// Promise
let p = new Promise(function(resolve,reject){
	somma_async(a,b,function(r){
		resolve(r);
	});
});

p.then(function(result) {
	console.log(result);
}, function() {});

// Promisification somma
function somma_async_promise(a,b) {
	return new Promise(function(resolve,reject){
		somma_async(a,b,function(r){
			resolve(r);
		});
	});
}

// Promisification prodotto
function prod_async_promise(a,b) {
	return new Promise(function(resolve,reject){
		prod_async(a,b,function(r) {
			resolve(r);
		});
	});
}

// Soluzione con le promise
somma_async_promise(a,b)
.then(function(val){
	return prod_async_promise(val,c);
})
.then(function(val){
	return somma_async_promise(val,12);
})
.then(function(val){
	return prod_async_promise(val,2);
})
.then(function(val){
	console.log(val);
});
