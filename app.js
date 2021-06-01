const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https =require('https')

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    
    res.sendFile(__dirname + '/signup.html')
   
})

app.post('/', (req,res)=>{

     const firstName = req.body.fName;
     const lastName = req.body.lName;
     const email = req.body.email
     
     const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
     };
     const jsonData = JSON.stringify(data);

     const url = "https://us6.api.mailchimp.com/3.0/lists/c3b1da9449"
     const options = {
         method: 'POST',
         auth: 'tarasK:3e7293c3ae3162277fc476a3c0fc7f02-us6'
     }
     const request = https.request(url, options, (respons)=>{
         
if(respons.statusCode === 200){
    res.sendFile(__dirname + '/success.html')
} else {
    res.sendFile(__dirname + '/failure.html')
}

        respons.on('data', (data)=>{
            console.log(JSON.parse(data))
        })
     })
     request.write(jsonData)
     request.end();
    
});

app.post('/failure.html', (req,res)=>{
    res.redirect('/')
})

app.post('/success.html', (req,res)=>{
    res.redirect('/')
})

app.listen(process.env.PORT  || 3000, ()=>{
    console.log('server is running on port 3000...');
})

// API key
//3e7293c3ae3162277fc476a3c0fc7f02-us6

//List ID
//c3b1da9449
