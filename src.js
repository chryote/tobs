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
function hitung(){
	console.log("gawe konteks canvas")
	const img = document.querySelector('#scream'); 
	const canvas = document.createElement('canvas'); 
	const ctx = canvas.getContext('2d'); 
 
	canvas.width = img.width; 
	canvas.height = img.height; 
 
	ctx.drawImage(img, 0, 0); 
	console.log("Nyari informasi per pixel dari gambar")
	var rgba = ctx.getImageData( 0, 0, img.width, img.height).data;
	var i=0;var j=0;var k=0;// variable nggo perulangan RGBA dadi 1 & 0
	var binary = [];
	var matrices = [];
	var neighbor = [];
	var regionProblem = [];
	console.log("helper untuk arah optimasi dimuat")
	var setProblem = [	0,1,4,1,8,1,12,1,
						1,2,5,2,9,2,13,2,
						2,3,6,3,10,3,14,3,
						3,4,7,4,11,4,15,4];
	var dataInput = [];
	var ouputConnectedness = [];
	var pos;
	sumOptimizedConnectedness = 0;
	finalOptimizedConnectedness = 0;
	console.log("helper untuk nyari koord 8x8 ke 4x4 dimuat")
	var mattriceCoord = [	0,0,
							1,8,
							2,16,
							3,24,
							4,256,
							5,264,
							6,272,
							7,280,
							8,512,
							9,520,
							10,528,
							11,536,
							12,768,
							13,776,
							14,784,
							15,792];
	console.log("data probabtilitas connectedness dimuat")
	var percentageConnectednes = [	"0000", 100,
									"0001", 75,
									"0010", 75,
									"0011", 50,
									"0100", 75,
									"0101", 50,
									"0110", 50,
									"0111", 25,
									"1000", 75,
									"1001", 50,
									"1010", 50,
									"1011", 25,
									"1100", 50,
									"1101", 25,
									"1110", 25,
									"1111", 0]
	console.log("data distribusi material dimuat")
	var kiri =["0010","0011","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
	var bawah = ["0000","0001","0010","0100","0101","1000"];
	var kanan =["0010","0011","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
	console.log("compose rgba value ke biner")
	while(i<rgba.length){
		j=rgba[i]+rgba[i+1]+rgba[i+2]+rgba[i+3];
		if(j<256){
			binary[k]=0;
			k=k+1;
		}else{
			binary[k]=1;
			k=k+1;
		}
		i=i+4;
	}
	console.log("dari binary dijadikan matriks 2x2")
	i=0; j=0; k=0;// variable nggo perulangan matrice
	while(i<4031){
		matrices[j]=""+binary[i]+binary[i+1]+binary[i+64]+binary[i+65];
		j=j+1;
		i=i+2;
		k=k+1;
		if(k==32){
			//console.log("i = "+i);
			i=i+64;
			k=0;
		}
	}
	console.log("mneghitung connectedness dari matriks 2x2")
	i=0; j=0;// variable nggo perulangan connectedess neighbor
	while(i<matrices.length){
		for(j=0;j<31;j++){
			if(matrices[i]== percentageConnectednes[j]){
				neighbor[i]=percentageConnectednes[j+1];
			}
		}
		i++;
	}
	console.log("mengubah matriks 2x2 menjadi 8x8")
	i=0; j=0; k=0;// variable nggo perulangan regionProblem
	while(i<799){
		//console.log(i);
		regionProblem[j]=(	neighbor[i]+neighbor[i+1]+neighbor[i+2]+
							neighbor[i+3]+neighbor[i+4]+neighbor[i+5]+
							neighbor[i+6]+neighbor[i+7]+
							neighbor[i+32]+neighbor[i+33]+neighbor[i+34]+
							neighbor[i+35]+neighbor[i+36]+neighbor[i+37]+
							neighbor[i+38]+neighbor[i+39]+
							neighbor[i+64]+neighbor[i+65]+neighbor[i+66]+
							neighbor[i+67]+neighbor[i+68]+neighbor[i+69]+
							neighbor[i+70]+neighbor[i+71]+
							neighbor[i+96]+neighbor[i+97]+neighbor[i+98]+
							neighbor[i+99]+neighbor[i+100]+neighbor[i+101]+
							neighbor[i+102]+neighbor[i+103]+
							neighbor[i+128]+neighbor[i+129]+neighbor[i+130]+
							neighbor[i+131]+neighbor[i+132]+neighbor[i+133]+
							neighbor[i+134]+neighbor[i+135]+
							neighbor[i+160]+neighbor[i+161]+neighbor[i+162]+
							neighbor[i+163]+neighbor[i+164]+neighbor[i+165]+
							neighbor[i+166]+neighbor[i+167]+
							neighbor[i+192]+neighbor[i+193]+neighbor[i+194]+
							neighbor[i+195]+neighbor[i+196]+neighbor[i+197]+
							neighbor[i+198]+neighbor[i+199]+
							neighbor[i+224]+neighbor[i+225]+neighbor[i+226]+
							neighbor[i+227]+neighbor[i+228]+neighbor[i+229]+
							neighbor[i+230]+neighbor[i+231])/64;
		j=j+1;
		i=i+8;
		k=k+1;
		if(k==4){
			//console.log(i);
			i=i+224;
			k=0;
		}
	}
	console.log("mencari least connected matrices")
	i=0; j=0;var marker=0;// variable nggo nggolek value min regionProblem
	i= Math.min.apply(Math, regionProblem);
	//console.log(i);
	for(j=0;j<16;j++){
		if(i==regionProblem[j]){
			marker=j;
			//console.log(k);
		}
	}
	console.log("membandingkan posisi masalah relatif terhadap elemen tujuan")
	i=0; j=0; k=0;// variable nggo nemtokke arah optimasi
	//disini menggunakan contoh mau diarahkan ke elemen 6 (setProblem 3). Jadi 1<3
	for(i=0;i<32;i++){
		//console.log(i);
		if(marker==setProblem[i]){
			j=setProblem[i+1];
			//console.log(j);
			if(j<3){
				//console.log("kanan");
				pos=0;
			}else if(j>3){
				//console.log("kiri");
				pos=1;
			}else if(j=3){
				//console.log("bawah");
				pos=2;
			}
		}
	}
	console.log("mengisi array buat nyimpen hasil optimasi")
	i=0; j=0; k=0; l=0;// variable nggo ngisi array dataInput
	//console.log(k);
	for(i = 0; i < 32; i++){
		if(marker==mattriceCoord[i]){
			j=mattriceCoord[i+1];
		}
	}
	//console.log(j);
	while(k<64){
		dataInput[k]=matrices[j];
		k=k+1;
		j=j+1;
	}
	console.log("melakukan simulated annealing")
	//console.log(dataInput)
	i=0; unit=0; rand=0;// variable nggo simulated annealing
	switch(pos){
		case 0:
			for(i=0;i<64;i++){
				unit=Math.floor(Math.random()*12)
				//console.log(unit)
				dataInput[i]=kanan[unit];
			}
			for(i=0;i<32;i++){
				rand=Math.floor(Math.random()*64)
				//console.log(unit)
				dataInput[rand]=bawah[0];
			}
			break;
		case 1:
			for(i=0;i<64;i++){
				unit=Math.floor(Math.random()*12)
				dataInput[i]=kiri[unit];
			}
			break;
		case 2:
			for(i=0;i<64;i++){
				unit=Math.floor(Math.random()*6)
				dataInput[i]=bawah[unit];
			}
			break;
	}
	console.log("menghitung total connectedness matrices yang teroptimasi")
	i=0; j=0;// variable nggo perulangan connectedess dataInput
	while(i<dataInput.length){
		for(j=0;j<31;j++){
			if(dataInput[i]== percentageConnectednes[j]){
				ouputConnectedness[i]=percentageConnectednes[j+1];
			}
		}
		i++;
	}
	i=0; j=0;// variable nggo penjumlahan connectedness seng wes di optimasi
	for(i=0; i<ouputConnectedness.length; i++){
		sumOptimizedConnectedness=sumOptimizedConnectedness+ouputConnectedness[i];
	}
	
	finalOptimizedConnectedness=sumOptimizedConnectedness/ouputConnectedness.length;
	document.getElementById("in").innerHTML = regionProblem[marker];
	document.getElementById("out").innerHTML = finalOptimizedConnectedness;
	console.log("Rampung")
	//Debug
	//console.log(finalOptimizedConnectedness);
	//console.log(Math.min.apply(Math, regionProblem))
	//console.log(sumOptimizedConnectedness);
	//console.log(dataInput.length);
	//console.log(ouputConnectedness.length)
	//console.log(ouputConnectedness)
	//console.log(output.length)
	//console.log(dataInput[0]);
	//console.log(matrices[512]);
	//console.log(Math.min.apply(Math, regionProblem))
	//console.log(marker);
	//console.log(regionProblem.length);
	//for(var z=0;z<16;z++){
	//	console.log(regionProblem[z]);
	//}
	//console.log(matrices[0]);
	//console.log(neighbor[0]);
	//console.log(binary.length);
	//console.log(matrices.length);
	//console.log(matrices[280]);
	//console.log(matrices[0]);
	//console.log(binary[0]+","+binary[1]+","+binary[64]+","+binary[65])
		
}
function noise(){
	var Titik = function (x, y) {
		this.x = x;
		this.y = y;
	}


	var heightMap = function (dimension, n, fp) {

		this.grid = []; 
		this.dimension = dimension;
		

		this.n = n;
		this.nfeaturePoints = fp;
		this.featurePoints = [];
		

		this.grid = new Array(this.dimension);
		for(var i = 0; i < this.dimension; i++) 
			this.grid[i] = new Array(this.dimension);
		

		this.cellularNoise();
	}
		

	heightMap.prototype.cellularNoise = function () {

		for(var i = 0; i < this.nfeaturePoints; i++)
			this.featurePoints[i] = new Titik( this.cariKoordAcak(), this.cariKoordAcak() );
			
		for(var x = 0; x < this.dimension; x++) {
			for (var y = 0; y < this.dimension; y++){
				var index = 0;
				var currentPixel = new Titik(x,y);
				var distanceValues = [];
				
				for(var i = 0; i < this.nfeaturePoints; i++) { 
					distanceValues.push( distance(currentPixel, this.featurePoints[i]) ); 
					distanceValues.sort(function(a, b){return a-b}); 
				}
			
				this.grid[x][y] = ( (distanceValues[this.n-1] / this.dimension) * 255 ) * 2;
			}
		}
		
		function distance(p, q) {
			return Math.sqrt( Math.pow( (p.x - q.x) , 2) + Math.pow( (p.y - q.y) , 2) );
		} 
	}

	heightMap.prototype.cariKoordAcak = function() {
		return ~~(Math.random() * this.dimension);
	}

	function print2DArray(array) {
		for(var x = 0; x < array.length; x++) {
			document.write("<p>");
			for (var y = 0; y < array[x].length; y++)
				document.write(array[x][y] + " - ");
			document.write("</p>");
		}
	}
	function get2DArraySize(array) {
		var arraySize = 0;
		for(var x = 0; x < array.length; x++) 
			arraySize += array[x].length;
		return arraySize;
	}
	function getRandomArbitrary(multiplier) {
	    return (Math.random() - 0.5) * multiplier;
	}
	function constrain(num) {
		if (num > 255) num = 255;
		if (num < 0) num = 0;
		return num;
	}

	function generateHeightmap() {
		var dimension_element = document.getElementById("dimension_option");
		var dimension = dimension_element.options[dimension_element.selectedIndex].value;
		var n_element = document.getElementById("nth_option");
		var n = n_element.options[n_element.selectedIndex].value;
		var fp_element = document.getElementById("feature_points_option");
		var fp = fp_element.options[fp_element.selectedIndex].value;
		var rendering_element = document.getElementById("render_option");
		var render = rendering_element.options[rendering_element.selectedIndex].value;
		console.log("Pembangkitan data heightMap");
		var m = new heightMap(dimension, n, fp); 
		console.log("A " + m.grid.length + "x" + m.grid[0].length + " larik dibangkitkan dengan " + get2DArraySize(m.grid) + " titik.");
		
		console.log("cari canvas dan langsung di resize")
		c = document.getElementById("web_canvas");
		c.height = dimension;
		c.width = dimension;
		ctx = c.getContext("2d");
		console.log("konteks canvas sudah disimpan")
		
		console.log("Mulai menggambar pola")
		if(render == "Grayscale") {
			for(var x = 0; x < m.grid.length; x++) {
				for (var y = 0; y < m.grid[x].length; y++) {
					ctx.fillStyle = "rgb("+Math.round(m.grid[x][y])+","+Math.round(m.grid[x][y])+", "+Math.round(m.grid[x][y])+")";
					ctx.fillRect(x, y, 1, 1);
				}
			}
		}
		if(render == "RedBlue") {
			for(var x = 0; x < m.grid.length; x++) {
				for (var y = 0; y < m.grid[x].length; y++) {
					ctx.fillStyle = "rgb("+Math.round(m.grid[x][y])+","+0+", "+(255-Math.round(m.grid[x][y]))+")";
					ctx.fillRect(x, y, 1, 1);
				}
			}
		}
		console.log("Rampung")
	}
	
}