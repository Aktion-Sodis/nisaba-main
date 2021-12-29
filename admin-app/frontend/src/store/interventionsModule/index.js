const interventionsModule = {
  namespaced: true,
  state: () => ({
    interventions: [
      {
        interventionId: "bd5f6df6-a64c-4d60-9df2-8f29bb7944d5",
        name: "Kitchen",
        description:
          "A kitchen is a room or part of a room used for cooking and food preparation in a dwelling or in a commercial establishment.",
      },
      {
        interventionId: "59fe15e7-59ad-46bf-a196-cbab81885d5b",
        name: "Toilet",
        description:
          "A toilet is a piece of sanitary hardware that collects human urine and feces, and sometimes toilet paper, usually for disposal.",
      },
      {
        interventionId: "c220fb83-a0e4-4463-a28a-f21b260e609a",
        name: "Plantation",
        description:
          "A plantation is an agricultural estate, generally centered on a plantation house, meant for farming that specializes in cash crops, usually mainly planted with a single crop, with perhaps ancillary areas for vegetables for eating and so on.",
      },
      {
        interventionId: "5f463cd0-22d3-4321-960d-a4e01efeeccf",
        name: "Birth Control",
        description:
          "Birth control, also known as contraception, anticonception, and fertility control, is a method or device used to prevent pregnancy.",
      },
      {
        interventionId: "a7dcb0d2-28ca-4679-aa98-f2fc07c66066",
        name: "Gender Equality",
        description:
          "Gender equality, also known as sexual equality or equality of the sexes, is the state of equal ease of access to resources and opportunities regardless of gender, including economic participation and decision-making; and the state of valuing different behaviors, aspirations and needs equally, regardless of gender. ",
      },
    ],
  }),
  getters: {
    /* READ */
    getInterventions: (state) => state.interventions,
    getInterventionById: (state, getters) => (interventionId) =>
      getters.getInterventions.find((e) => e.interventionId === interventionId),
  },
  mutations: {
    /* CREATE, UPDATE, DELETE */
    addIntervention: (state, payload) => {
      state.interventions = state.interventions.concat(payload);
    },
    replaceIntervention: (state, { interventionId, name, description }) => {
      state.interventions = state.interventions.map((i) =>
        i.interventionId === interventionId
          ? {
              ...i,
              interventionId,
              name,
              description,
            }
          : i
      );
    },
    deleteIntervention: (state, interventionId) => {
      state.interventions = state.interventions.filter(
        (i) => i.interventionId !== interventionId
      );
    },
  },
  actions: {},
};

export default interventionsModule;
