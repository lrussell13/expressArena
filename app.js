const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
  });

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
});

app.get('/sum', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if(!a){
        return res.status(400).send('Please provide a first number'); 
    }

    if(!b){
        return res.status(400).send('Please provide a second number'); 
    }

    const sum = a + b;
    const answer = `The sum of ${a} and ${b} is ${sum}`

    res.send(answer);
})

app.get('/cipher', (req, res) => {
    
    const text = req.query.text;
    const shift = req.query.shift;

    if(!text){
        return res.status(400).send('Please provide some text');
    }

    if(!shift){
        return res.status(400).send('Please provide a shift value');
    }

    let textArr = text.toUpperCase().split('');

    let shiftedTextArr = textArr.map(letter => {
        let charCode = letter.charCodeAt(0);
    
        if(charCode + shift > 91){
          charCode = charCode - 26;
        }
    
        let newLetter = String.fromCharCode((charCode + shift));
        
        return newLetter;
      });

    const newText = shiftedTextArr.join('')

    res.send(newText);
});

app.get('/lotto', (req, res) => {
    const nums = req.query.num;

    if(!nums || nums.length < 6){
        return res.status(400).send('Please provide all six numbers');
    }

    let lottoNums = [];

    for(let i = 0; i <= 6; i++){
        lottoNums.push(Math.floor(Math.random() * 21));
    }
    
    let counter = 0;

    for(let i = 0; i <= 6; i++){
        newNum = Number(nums[i])
        if(lottoNums.indexOf(newNum) >= 0){
          counter++;
        }
    }

    if(counter < 4){
        res.send("Sorry, you lose")
    }  else if(counter === 4){
        res.send("Congratulations, you win a free ticket")
    } else if(counter === 5){
        res.send("Congratulations! You win $100!")
    } else if (counter === 6){
        res.send("Wow! Unbelievable! You could have won the mega millions!")
    } 
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

