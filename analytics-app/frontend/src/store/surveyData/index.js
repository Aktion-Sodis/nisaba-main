const survey = {
  state: {
    selectedSurveyID: ""
  },
  getters: {
    getSelectedSurveyID (state) {
      return state.selectedSurveyID
    }
  },
  mutations: {
    setSelectedSurveyID (state, newSelectedSurveyID){
      state.selectedSurveyID = newSelectedSurveyID;
    },
  },
}

export default survey;