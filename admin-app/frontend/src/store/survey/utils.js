export class EmptySurvey {
  constructor() {
    this.name = "";
    this.description = "";
    this.type = "Default";
    this.questionsIds = [];
    this.creationDate = Date.now();
    this.lastEditDate = null;
    this.tags = [];
    this.isEmptySurvey = true;
  }
}

export class Survey {
  constructor({
    name,
    description,
    type,
    questionsIds,
    creationDate,
    lastEditDate,
    tags,
  }) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.questionsIds = questionsIds;
    this.creationDate = creationDate;
    this.lastEditDate = lastEditDate;
    this.tags = tags;
    this.isEmptySurvey = false;
  }
}
