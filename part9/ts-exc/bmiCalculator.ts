interface BMIValues {
    height: number,
    weight: number
}

const validateArgs = (args: Array<string>): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          weight: Number(args[3])
        }
      } else {
        throw new Error('Provided values were not numbers!');
      }
}

const calculateBmi = (height: number, weight: number): string => {
    const meters: number = height / 100;
    const bmi: number = weight / (meters * meters);
    if (bmi < 18.5) {
        return 'underweight';
    }
    else if (bmi >= 18.5 && bmi < 25) {
        return 'normal weight';
    }
    else if (bmi >= 25 && bmi < 30) {
        return 'overweight';
    }
    else {
        return 'obese';
    }
}

try {
    const { height, weight } = validateArgs(process.argv)
    console.log(calculateBmi(height, weight))
}
catch (error: unknown){
    if (error instanceof Error){
        console.log("Error: ", error.message)
    }
}