import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    
    try{
        if(isNaN(weight) || isNaN(height)){
            throw new Error("malformatted request");
        }
        const bmi: string = calculateBmi(height, weight);
        res.json({
            height,
            weight,
            bmi
        });

    }
    catch (error: unknown){
        res.sendStatus(500);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});