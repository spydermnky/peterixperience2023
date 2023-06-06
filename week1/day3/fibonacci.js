function fibonacci() {
    let n1 = 0;
    let n2 = 1;
    let fibonacciArray = [n1, n2];
  
    for (let i = 2; i < 10; i++) {
      let nextNum = n1 + n2;
      fibonacciArray.push(nextNum);
      n1 = n2;
      n2 = nextNum;
    }
    console.log(fibonacciArray.join(','));
  }
fibonacci();
