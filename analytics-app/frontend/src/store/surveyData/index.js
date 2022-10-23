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
      console.log(state.selectedSurveyID)
    },
  },
}

export default survey;