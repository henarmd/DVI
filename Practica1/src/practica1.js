/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
 const messageWin = "Ueueue";
 const messagePlay = "Play";
 const messageTry = "Uyy";
 const messageFound = "Vamoos!";
 const nameBack = "back";
var MemoryGame = MemoryGame || {};
/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
};

MemoryGame.prototype = {

	initGame : function(){
		//Inicializo
		memoryGame = new Array();
		memoryGame.Cartas = new Array();
		memoryGame.Solved = 0;
		memoryGame.Message = messagePlay;
		memoryGame.Tried = 0;
		//Relleno Array
		for (sprite in gs.maps){
			if(sprite != nameBack){
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
		//Mando dibujar
		for( i = 0 ; i < memoryGame.Cartas.length ; i++){
			memoryGame.Cartas[i].draw(gs,i);
		};
		//Compruebo si ha ganado
		if(memoryGame.Solved >= memoryGame.Cartas.length ){
			clearInterval (memoryGame.game);
			memoryGame.Message = messageWin;
			alert("Enhorabuena has ganado el juego en " +
			memoryGame.Tried + " intentos, Vuelve a intentarlo");
			MemoryGame.prototype.initGame();

		}
		gs.drawMessage(memoryGame.Message);
	},

	loop : function(){
		//Dibujo cada 16 ms
		memoryGame.game = window.setInterval(
			this.draw,
			 16);
	},

	onClick : function(cardId){
		//Siempre que este sin levantar
		if(memoryGame.Cartas[cardId].State == "Down"){
			//Volteo
			memoryGame.Cartas[cardId].flip();
			//Tiempo que se mantiene 3s
			window.clearTimeout();
			window.setTimeout(function(){
				//Busco otras levantadas, que no sea la clickada
				for(c = 0 ; c < memoryGame.Cartas.length ; c++){
					if(memoryGame.Cartas[c].State == "Up" && c != cardId){
						if( memoryGame.Cartas[c].compareTo(memoryGame.Cartas[cardId])){
							//Acierto
							memoryGame.Cartas[c].found();			
							memoryGame.Cartas[cardId].found();
							memoryGame.Solved = memoryGame.Solved + 2;
							memoryGame.Message = messageFound;
						}else{
							//Fallo
							memoryGame.Cartas[c].flip();
							memoryGame.Cartas[cardId].flip();	
							memoryGame.Message = messageTry;							
						}
					memoryGame.Tried ++;
					}
				}

			},500);
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
 	}

 	this.found = function(){
 		this.State = "Found";
 	}

 	this.compareTo = function(other){
 		return (this.Sprite == other.Sprite );
 	}

 	this.draw = function(gs, pos){
 		if(this.State != "Down")gs.draw(this.Sprite, pos);
 		else gs.draw(nameBack, pos);
 	}

};