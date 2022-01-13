function kiri(){
	document.getElementById("a").innerHTML = Math.floor(Math.random() * 2);
	document.getElementById("b").innerHTML = "1";
	document.getElementById("c").innerHTML = "0";
	document.getElementById("d").innerHTML = Math.floor(Math.random() * 2);
}

function bawah(){
	document.getElementById("a").innerHTML = Math.floor(Math.random() * 2);
	document.getElementById("b").innerHTML = Math.floor(Math.random() * 2);
	document.getElementById("c").innerHTML = "0";
	document.getElementById("d").innerHTML = "0";
}

function kanan(){
	document.getElementById("a").innerHTML = "1";
	document.getElementById("b").innerHTML = "0";
	document.getElementById("c").innerHTML = "1";
	document.getElementById("d").innerHTML = Math.floor(Math.random() * 2);
}