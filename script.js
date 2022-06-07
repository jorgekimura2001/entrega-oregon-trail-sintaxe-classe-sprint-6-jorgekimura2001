class Traveler {
    constructor(name){
        this.name = name;          // string
        this.food = 1;             // number
        this.isHealthy = true;     // boolean
    }
    hunt(){
        this.food += 2
    }
    eat(){
        if(this.food > 0){
            this.food = this.food - 1
        }else{
            this.isHealthy = false
        }
    }
}

class Wagon {
    constructor(capacity){
        this.capacity = capacity;
        this.passengers = []
    }
    getAvailableSeatCount(){
        return this.capacity - this.passengers.length
    }
    join(passenger){
        if(this.getAvailableSeatCount() > 0){ // se houver espaço 
            this.passengers.push(passenger)
        }else{
            return `Não cabe mais ninguem`
        }
    }
    shouldQuarantine(){
        // variavel para percorrer o array de objetos e trazer todos os status de isHealthy 
        const healthy = this.passengers.map((element) => element.isHealthy)
        if(healthy.includes(false)){ // se o array tiver algum false, que no caso é se a pessoa está saudavel ele já traz true e tem de ficar de quarentena  
            return true
        }else{ // caso não, ou seja, caso todos estejam saudaveis, retorne false e todos podem continuar a viagem
            return false
        }
    }

    totalFood(){
        // reduce -- para somar o valor das quantidade de comida 
        const total = this.passengers.reduce((acc, actual) => acc += actual.food, 0)
        return total
    }
}
// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');

console.log(`${wagon.getAvailableSeatCount()} should be 2`);

wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);

wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);

henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)

console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);