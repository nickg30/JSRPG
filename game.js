// ****************************************************
// Library
// ****************************************************
// ____________________________________________________
// RANDOMIZER
// ____________________________________________________
function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// ***************************************************** 
// Game Constructors
// *****************************************************
// _____________________________________________________
// PLAYER
// _____________________________________________________
function Player() {
    this.name = 'Nick';
    this.hp = {
        currentHP: 100,
        maxHP: 100,
        minHp: 100
    };
    this.energy = {
        currentEnergy: 100,
        maxEnergy: 100,
        minEnergy: 0
    };
    this.exp = 0;
    this.resources = {
        wood: 0,
        stone: 0,
        gold: 0,
        iron: 0
    };
    this.actions = {
        mine: function(resource) {
            if(player.energy.currentEnergy >= 10) {
                console.log('mining ' + resource + '...');
                player.energy.currentEnergy -= 10;
                player.resources[resource] += 10;
            }
        },
        rest: function(howLong) {
            setTimeout(function () {
                player.hp.currentHP += howLong * 25;
                console.log('rested!!!');
            }, howLong * 60000);
            console.log('resting...');
        }
    };
    this.weapons = {};
    this.currentWeapon = {};
};
// _____________________________________________________
// WEAPON
// ____________________________________________________
function Weapon(name, minDamage, maxDamage) {
    this.name = name;
    this.damage = {
        maxDamage: maxDamage,
        minDamage: minDamage
    };
    this.attackDmg = function() {
        return randomizer(minDamage, maxDamage);
    };
};
// ________________________________________________
// POTION
// ________________________________________________
function HealthPotion(minRecover, maxRecover) {
    this.recovery = {
        minRecover: minRecover,
        maxRecover: maxRecover
    };
    this.heal = function() {
        player.hp.currentHP += randomizer(minRecover, maxRecover);
        console.log("new hp: " + player.hp.currentHP);
    };
};
// _______________________________________________
// Game Objects
// _______________________________________________
var healthPotion = new HealthPotion(20, 40);
var sword = new Weapon('Sword', 5, 20);
var player = new Player();