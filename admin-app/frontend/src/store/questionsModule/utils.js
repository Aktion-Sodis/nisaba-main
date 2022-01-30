export class EmptyQuestion {
  constructor() {
    this.questionText = "";
    this.questionType = "text";
    this.answers = [{ answerText: "" }];
    this.isEmptyQuestion = true;
  }
}
