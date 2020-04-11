export function random(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function test(answerObj, quality, money, time) {
    return [answerObj.nextQuestion, quality + answerObj.q, money + answerObj.m, time + answerObj.t];
}