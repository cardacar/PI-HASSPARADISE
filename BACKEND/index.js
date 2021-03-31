import app from './app.js';

app.listen(app.get('port'), ()=>{
    console.log(`Backend on port ${app.get('port')}`)
})