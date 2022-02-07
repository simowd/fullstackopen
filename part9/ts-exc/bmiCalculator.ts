const calculateBmi = (height: number, weight: number) : string => {
    const meters: number = height / 100
    const bmi: number = weight / (meters * meters)
    if (bmi < 18.5){
        return 'underweight'
    }
    else if (bmi >= 18.5 && bmi < 25){
        return 'normal weight'
    }
    else if (bmi >= 25 && bmi < 30){
        return 'overweight'
    }
    else{
        return 'obese'
    }
}

console.log(calculateBmi(180, 74))