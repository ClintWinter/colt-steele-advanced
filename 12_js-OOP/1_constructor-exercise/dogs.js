function Dog(name, age) {
    this.name = name;
    this.age = age;
    this.bark = function() {
        console.log(this.name + " just barked!");
    }
}

var emma = new Dog("Emma", 16);
var phoebe = new Dog("Phoebe", 5);

emma.bark();
phoebe.bark();