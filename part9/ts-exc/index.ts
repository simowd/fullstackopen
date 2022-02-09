/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if(body){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if(!body.daily_exercises || !body.target){
            res.json({
                error: 'missing content'
            });
        }

        res.json(calculateExercises(body.daily_exercises, body.target));

    }
    else {
        res.json({
            error: 'missing content'
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});