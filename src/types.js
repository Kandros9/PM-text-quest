export class Answer {
    constructor(id, text, nextQuestion, q, t, m) {
        this.id = id;
        this.text = text;
        this.nextQuestion = nextQuestion;
        this.q = q;
        this.t = t;
        this.m = m;
    }
}

export class Question {
    constructor(id, text, ...args) {
        this.id = id;
        this.text = text;
        this.answers = args;
    }

}