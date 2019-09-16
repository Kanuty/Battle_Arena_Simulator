
	window.onload = function(){
		refreshPlayerStats();
		refreshEnemyStats();
	}

	//stats constructor
	
		function stats(health, shield, energy, evasion, armor, power, actionPoints)
		{
			this.health = health,
			this.shield = shield,
			this.energy = energy,
			this.evasion = evasion,
			this.armor = armor,
			this.power = power,
			this.actionPoints = actionPoints
		};
		//Player stats as a base. It should not change during a battle!
		let player = new stats(200,30,30,10,15,20,5);
		//Player stats during a battle. It can change.
		let temporaryPlayer = new stats(player.health, player.shield, player.energy, player.evasion, player.armor, player.power, player.actionPoints);
		
		//Enemy stats as a base. It should not change during a battle!
		let enemy = new stats(400,10,0,5,5,0,0);
		//Enemy stats during a battle. It can change.
		let temporaryEnemy = new stats(enemy.health, enemy.shield, enemy.energy, enemy.evasion, enemy.armor, enemy.power, enemy.actionPoints);

		console.log(temporaryPlayer,temporaryEnemy);
	
		


		// decrease health, increase power
		function soulTap(){
		// playerAPcheck
			if( temporaryPlayer.actionPoints >= 2){
			temporaryPlayer.health = temporaryPlayer.health - 15;
			temporaryPlayer.power = temporaryPlayer.power + 20 + Math.ceil(Math.random()*10-5) ;
			temporaryPlayer.actionPoints = temporaryPlayer.actionPoints - 2;
			
			refreshPlayerStats();
		 	playerHPcheck();
		 }
		 else {alert("You are exhausted");}
		}
		// decrease energy, increase health 
		function heal(){
			if( temporaryPlayer.actionPoints >= 1 && temporaryPlayer.energy >= 15){
				temporaryPlayer.actionPoints = temporaryPlayer.actionPoints - 1;
				temporaryPlayer.energy = temporaryPlayer.energy - 15;
				temporaryPlayer.health = temporaryPlayer.health + 50;
				playerHPovergrow();
				refreshPlayerStats();
				}
			else {alert("You are exhausted");}
		}
		// refull energy
		function transcendency(){
			if( temporaryPlayer.actionPoints >= 5) {
				temporaryPlayer.actionPoints = temporaryPlayer.actionPoints - 5;
				temporaryPlayer.energy = player.energy;
				refreshPlayerStats();

				}
			else {alert("You are exhausted");}
		}
		// remove armor, highly increase evasion
		function shadowStep(){
			if( temporaryPlayer.actionPoints >= 1){
				temporaryPlayer.actionPoints = temporaryPlayer.actionPoints - 1;
				temporaryPlayer.armor = 0;
				temporaryPlayer.evasion = temporaryPlayer.evasion + 35;
				if (temporaryPlayer.evasion >= 70){
					temporaryPlayer.evasion = 70}
				refreshPlayerStats();
			}
			else {alert("You are exhausted");}
		}
		// powerfull attack that can't be dodged
		function implosion(){
			if( temporaryPlayer.actionPoints >= 3 && temporaryPlayer.energy >= 30){
				temporaryPlayer.actionPoints = temporaryPlayer.actionPoints - 3;
				
				// critChecker(pecentage chance of a crit for a spell, base dmg of a spell)
				calculateDamage(5,40);

				temporaryPlayer.energy = temporaryPlayer.energy - 30;
				refreshPlayerStats();
				refreshEnemyStats();
				enemyHPcheck()
			}
			else {alert("You are exhausted");}
		}
		// standard atack that do not ignore anything
		function mortalStrike(){
			if( temporaryPlayer.actionPoints >= 2 ){
				temporaryPlayer.actionPoints = temporaryPlayer.actionPoints - 2;
				
				// evasionChecker(pecentage chance of a CRIT (yes, crit) for a spell, base dmg of a spell)
				evasionChecker(5, 20)
				
				refreshPlayerStats();
				refreshEnemyStats();
				enemyHPcheck()
			}
			else {alert("You are exhausted");}
		}
		//utility functions
		function turnEnd(){
			temporaryPlayer.actionPoints = 5;
			temporaryPlayer.shield = player.shield;
			temporaryEnemy.shield = enemy.shield;
			refreshPlayerStats();
			refreshEnemyStats();
		}

		function playerHPcheck(){
			if( temporaryPlayer.health <= 0)
			{alert("You are dead");}
		}
		function enemyHPcheck(){
			if( temporaryEnemy.health <= 0)
			{alert("Enemy is dead");}
		}
		function playerHPovergrow(){
			if( temporaryPlayer.health > player.health)
				{temporaryPlayer.health = player.health}
		}

		function refreshPlayerStats(){
		document.getElementById("playerHealth").innerHTML = "Health: "+ temporaryPlayer.health +"/"+player.health;
		document.getElementById("playerShield").innerHTML = "Shield: "+ temporaryPlayer.shield +"/"+player.shield;
		document.getElementById("playerEnergy").innerHTML = "Energy: "+ temporaryPlayer.energy +"/"+player.energy;
		document.getElementById("playerEvasion").innerHTML = "Evasion: "+ temporaryPlayer.evasion;
		document.getElementById("playerArmor").innerHTML = "Armor: "+ temporaryPlayer.armor;
		document.getElementById("playerPower").innerHTML = "Power: "+ temporaryPlayer.power;
		document.getElementById("playerActionPoints").innerHTML = "Action Points: "+ temporaryPlayer.actionPoints +"/"+player.actionPoints;}

		function refreshEnemyStats(){
		document.getElementById("enemyHealth").innerHTML = "Health: "+ temporaryEnemy.health +"/"+enemy.health;
		document.getElementById("enemyShield").innerHTML = "Shield: "+ temporaryEnemy.shield +"/"+enemy.shield;
		document.getElementById("enemyEnergy").innerHTML = "Energy: "+ temporaryEnemy.energy +"/"+enemy.energy;
		document.getElementById("enemyEvasion").innerHTML = "Evasion: "+ temporaryEnemy.evasion;
		document.getElementById("enemyArmor").innerHTML = "Armor: "+ temporaryEnemy.armor;
		document.getElementById("enemyPower").innerHTML = "Power: "+ temporaryEnemy.power;
		document.getElementById("enemyActionPoints").innerHTML = "Action Points: "+ temporaryEnemy.actionPoints +"/"+enemy.actionPoints;}

		function evasionChecker(critchance, dmg){
		let evasionChance = Math.ceil(Math.random()*100);
				if (evasionChance > temporaryEnemy.evasion){
					calculateDamage(critchance,dmg);
					}
				else {console.log("dodge!")}
		}

	
		function calculateDamage(baseDamage, critChance){
    let critRoll = Math.ceil(Math.random()*100);
    if(critRoll <= critChance){
        baseDamage -= 10;
    } else {
        baseDamage *= 2;
    }
    let potentialDamage = (temporaryPlayer.power + Math.ceil(Math.random() * baseDamage));
    let dealtDmg = potentialDamage - temporaryEnemy.armor;
    if(temporaryEnemy.shield >= dealtDmg){
        temporaryEnemy.shield -= dealtDmg;
    } else {
        temporaryEnemy.health -= dealtDmg - temporaryEnemy.shield;
        temporaryEnemy.shield = 0;
    }
}
