interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (hoursTrained: Array<number>, target: number): Result => {
    const sumHoursTrained: number = hoursTrained.reduce((sum, hours) => sum + hours, 0)
    const average: number = sumHoursTrained/hoursTrained.length

    let rating: number = 0
    let ratingDescription: string = ''

    if(average > target + 1){
        ratingDescription = 'keep it up'
        rating = 3
    }
    else if (average < target + 1 && average > target -1){
        ratingDescription = 'not too bad but could be better'
        rating = 2
    }
    else{
        ratingDescription = 'you should improve',
        rating = 1
    }

    return {
        periodLength: hoursTrained.length,
        trainingDays: hoursTrained.filter((hours) => hours !== 0).length,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))