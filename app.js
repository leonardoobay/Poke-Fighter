new Vue({
    el: '#app',
    data:  {
      player1HP: 100,
      player2HP: 100,
      chosenPokemon:"squirtle",
      hasGameStarted:  false,
      pokemon: [{name:"squirtle" , specialAttack: "bubblebeam", attack:"bite", avatar: "squirtle.png"} , {name:"pikachu" , specialAttack: "thunder", attack:"quickAttack" , avatar: "pikachu.png"},
      {name:"bulbasaur" , specialAttack: "vine whip", attack:"tackle" , avatar: "bulbasaur.png"} , {name:"charmander" , specialAttack: "ember", attack:"scratch" , avatar: "charmander.png"}],
      turns: []
   },
   methods: {
       startGame: function(){
        this.hasGameStarted = true;
        this.player2HP = 100;
        this.player1HP = 100;
       },
       endGame: function ()
       {
        this.hasGameStarted = false;
       },
       attack: function (){
        var attk =  this.calculateDamage(10);
       this.player2HP-=attk;
       this.turns.unshift({
        isPlayer:true,
        text: "Player hits monster for " + attk + " damage"
    });
       this.checkHP();

       var p2attk =  this.calculateDamage(10);
       this.player1HP-=p2attk;
       this.turns.unshift({
        isPlayer:false,
        text: "Monster hits you for " + p2attk + " damage"
    });
       this.checkHP();
        },
        specialAttack: function(){
         var attk =  this.calculateDamage(20);
         this.player2HP-=attk;
         this.turns.unshift({
            isPlayer:true,
            text: "Player hits monster for " + attk + " damage"
        });
         this.checkHP();
         var p2attk =  this.calculateDamage(10);
         this.player1HP-=p2attk;
         this.turns.unshift({
            isPlayer:false,
            text: "Monster hits you for " + p2attk + " damage"
        });
         this.checkHP();
 
     },
     recover: function  (){
      var boosthp =  Math.floor((Math.random() * 20) + 1);
      if(this.player1HP + boosthp <= 100){
        this.player1HP += boosthp;
        this.turns.unshift({
            isPlayer:true,
            text: "Player recovers " + boosthp + " HP"
        });
         this.checkHP();

         var p2attk = this.calculateDamage(10);
         this.player1HP-=p2attk;
         this.turns.unshift({
            isPlayer:false,
            text: "Monster hits you for " + p2attk + " damage"
        });
         this.checkHP();
      }
      else{
        this.player1HP = 100;
        this.checkHP();

        var p2attk = this.calculateDamage(10);
        this.player1HP-=p2attk;
        this.checkHP();
      }

         

     },
     checkHP: function(){
         if (this.player2HP <= 0){
             if(confirm("YOU WON! Rematch?")){
                 this.startGame();
             }
             else{
                 this.hasGameStarted = false;
             }
         return true;
         }
         if (this.player1HP <= 0){
            if(confirm("GameOver Rematch?")){
                this.startGame();
            }
            else{
                this.hasGameStarted = false;
            }
        return true;
        }
       return false;
     },
     calculateDamage: function(max){
        return  Math.floor((Math.random() * max) + 1)
     }
   },
  
      
   
});