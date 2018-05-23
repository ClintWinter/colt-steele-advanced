function countDown(counter) {
    var intv = setInterval(function() {
        
        if (counter === 0) {
            console.log("Ring Ring Ring!!!");
            clearInterval(intv);
            return;
        }

        console.log(counter);
        counter--;
        
    }, 1000);
}