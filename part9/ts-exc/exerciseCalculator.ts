interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface Training {
    hoursTrained: Array<number>,
    target: number
}

const verifyArgs = (args: Array<string>): Training => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (isNaN(Number(args[2]))){
        throw new Error("Target value is not a number");
    }

    let hoursTrained: Array<number> = [];

    for (let i = 3; i < args.length; i++){
        if(!isNaN(Number(args[i]))){
            hoursTrained = hoursTrained.concat(Number(args[i]));
        }
        else{
            throw new Error(`Value for day ${i} is not a number`);
        }
    }
    
    return {
        hoursTrained,
        target: Number(args[2])
    };
};

const calculateExercises = (hoursTrained: Array<number>, target: number): Result => {
    const sumHoursTrained: number = hoursTrained.reduce((sum, hours) => sum + hours, 0);
    const average: number = sumHoursTrained/hoursTrained.length;

    let rating = 0;
    let ratingDescription = '';

    if(average > target + 1){
        ratingDescription = 'keep it up';
        rating = 3;
    }
    else if (average < target + 1 && average > target -1){
        ratingDescription = 'not too bad but could be better';
        rating = 2;
    }
    else{
        ratingDescription = 'you should improve';
        rating = 1;
    }

    return {
        periodLength: hoursTrained.length,
        trainingDays: hoursTrained.filter((hours) => hours !== 0).length,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

try {
    const { hoursTrained, target } = verifyArgs(process.argv);
    console.log(calculateExercises(hoursTrained, target));
}
catch (error: unknown){
    if (error instanceof Error){
        console.log("Error: ", error.message);
    }
}