/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};
/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
	alert(1);
};

MemoryGame.prototype = {
		totalCartas : 8,
	initGame : function(){
		//Inicializo
		alert(8);
		memoryGame = new Array();
		memoryGame.Cartas = new Array();
		memoryGame.Solved = 0;
		memoryGame.Message = "Playing";

		//Relleno Array
		for (sprite in gs.maps){
			if(sprite != "back"){
	    	memoryGame.Cartas.push(new MemoryGame.Card(sprite));
			memoryGame.Cartas.push(new MemoryGame.Card(sprite));
			}
		}
		//Descoloco
		memoryGame.Cartas.sort(function() {return Math.random() - 0.5});
		
		//A bucle
		this.loop();
	},

	draw : function(){
		//Mensaje actual
			alert(0);
		gs.drawMessage(memoryGame.Message);
		alert(1);
		//Mando dibujar
		for(i = 0 ; i<this.totalCartas*2 ; i++){
					alert(2);
			memoryGame.Cartas[i].draw(gs,i);
		};
	},

	loop : function(){
		this.game = window.setInterval(
			this.draw,
			 16);
	},

	 Win : function(){
		alert(memoryGame.Solved)
		if(memoryGame.Solved >= this.totalCartas ){
			clearInterval (this.game);
			memoryGame.Message("Ueueueu!!");
		}
	},

	onClick : function(cardId){
		//Volteo
		if(memoryGame.Cartas[cardId].State != "Found"){
			memoryGame.Cartas[cardId].flip();
			//Busco otras levantadas
			window.clearTimeout();
			window.setTimeout(function(){
			var count = 0;
			for(c = 0 ; c+1 < this.totalCartas*2 ; c++){
					if(memoryGame.Cartas[c].State == "Up" && c!=cardId){

						if( memoryGame.Cartas[c].compareTo(memoryGame.Cartas[cardId])){
							//Acierto
							memoryGame.Cartas[c].found();			
							memoryGame.Cartas[cardId].found();
							memoryGame.Solved++;
						}else{
							memoryGame.Cartas[c].flip();
							memoryGame.Cartas[cardId].flip();								
						}
					}
			}	
		},500);
			
			this.Win();
		}
	}
	};


/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGame.Card = function(id) {

	//Nombre
 	this.Sprite = id;
 	//State
 	this.State = "Down";

 	this.flip = function(){
 		if(this.State != "Found")
 		this.State = (this.State == "Up"?"Down":"Up");	
		else	alert("Excepcion");
 	}
 	this.found = function(){
 		this.State = "Found";
 	}
 	this.compareTo = function(other){
 		return (this.Sprite == other.Sprite );
 	}
 	this.draw = function(gs, pos){
 		if(this.State != "Down")
 		gs.draw(this.Sprite, pos);
 		else
 		gs.draw("back", pos);
 	}

};