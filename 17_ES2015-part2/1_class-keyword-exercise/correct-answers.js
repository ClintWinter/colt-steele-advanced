
// Write a method called multiplyFavoriteNumber that takes in a number and returns the product of the number and the Person's favorite number

// function Person(firstName, lastName, favoriteColor, favoriteNumber){
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.favoriteColor = favoriteColor;
//   this.favoriteNumber = favoriteNumber;
//   this.multiplyFavoriteNumber = function(num){
//     return num * this.favoriteNumber;
//   }
// }

class Person {
    constructor(firstName, lastName, favoriteColor, favoriteNumber){
      this.firstName = firstName;
      this.lastName = lastName;
      this.favoriteColor = favoriteColor;
      this.favoriteNumber = favoriteNumber;
      this.family = [];
    }
    fullName(){
      return `${this.firstName} ${this.lastName}`
    }
    multiplyFavoriteNumber(num){
      return num * this.favoriteNumber;
    }
    addToFamily(obj){
      if(obj.constructor === Person && this.family.indexOf(obj) === -1){
        this.family.push(obj)
      }
      return this.family
    }
  }