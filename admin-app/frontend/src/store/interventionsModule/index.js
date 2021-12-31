import { v4 as uuidv4 } from "uuid";

const interventionsModule = {
  namespaced: true,
  state: () => ({
    interventions: [
      {
        interventionId: "bd5f6df6-a64c-4d60-9df2-8f29bb7944d5",
        name: "Kitchen",
        description:
          "A kitchen is a room or part of a room used for cooking and food preparation in a dwelling or in a commercial establishment.",
        tags: ["7bbe9c5f-1784-41c5-8795-ae449ec95498"],
        content: [
          {
            id: "eff8b64c-22e9-4b34-948e-465a3f5b9a4a",
            type: "MarkdownDocument",
            name: "Some explanatory document",
            description:
              "IKEA is a Swedish-origin Dutch-headquartered multinational conglomerate that designs and sells ready-to-assemble furniture, kitchen appliances and home accessories, among other goods and home services.",
            tags: ["1a19542e-509a-4648-8280-bf5acb9825d7"],
          },
        ],
      },
      {
        interventionId: "59fe15e7-59ad-46bf-a196-cbab81885d5b",
        name: "Toilet",
        description:
          "A toilet is a piece of sanitary hardware that collects human urine and feces, and sometimes toilet paper, usually for disposal.",
        tags: ["7bbe9c5f-1784-41c5-8795-ae449ec95498"],
        content: [],
      },
      {
        interventionId: "c220fb83-a0e4-4463-a28a-f21b260e609a",
        name: "Plantation",
        description:
          "A plantation is an agricultural estate, generally centered on a plantation house, meant for farming that specializes in cash crops, usually mainly planted with a single crop, with perhaps ancillary areas for vegetables for eating and so on.",
        tags: ["7bbe9c5f-1784-41c5-8795-ae449ec95498"],
        content: [],
      },
      {
        interventionId: "5f463cd0-22d3-4321-960d-a4e01efeeccf",
        name: "Birth Control",
        description:
          "Birth control, also known as contraception, anticonception, and fertility control, is a method or device used to prevent pregnancy.",
        tags: [
          "c1f87fc0-9e7c-400c-aec5-73719a87642a",
          "4b139d0e-1d61-4317-8cc6-1e1364d3b6b9",
        ],
        content: [
          {
            id: "300cc45e-f212-42a9-a940-367df3fd1dbb",
            type: "Image",
            name: "Some explanatory image",
            description:
              "An image (from Latin: imago) is an artifact that depicts visual perception, such as a photograph or other two-dimensional picture, that resembles a subject—usually a physical object—and thus provides a depiction of it.",
            tags: ["1a19542e-509a-4648-8280-bf5acb9825d7"],
          },
          {
            id: "2c3fb7fe-c23c-4164-a6e7-2fc4e969f18c",
            type: "Video",
            name: "Some explanatory video",
            description:
              "Video is an electronic medium for the recording, copying, playback, broadcasting, and display of moving visual media.",
            tags: ["1a19542e-509a-4648-8280-bf5acb9825d7"],
          },
        ],
      },
      {
        interventionId: "a7dcb0d2-28ca-4679-aa98-f2fc07c66066",
        name: "Gender Equality",
        description:
          "Gender equality, also known as sexual equality or equality of the sexes, is the state of equal ease of access to resources and opportunities regardless of gender, including economic participation and decision-making; and the state of valuing different behaviors, aspirations and needs equally, regardless of gender. ",
        tags: [
          "c1f87fc0-9e7c-400c-aec5-73719a87642a",
          "4b139d0e-1d61-4317-8cc6-1e1364d3b6b9",
        ],
        content: [],
      },
    ],
    interventionTags: [
      { tagId: "7bbe9c5f-1784-41c5-8795-ae449ec95498", name: "Technology" },
      { tagId: "4b139d0e-1d61-4317-8cc6-1e1364d3b6b9", name: "Education" },
      { tagId: "c1f87fc0-9e7c-400c-aec5-73719a87642a", name: "Social" },
    ],
    interventionContentTags: [
      { tagId: "1a19542e-509a-4648-8280-bf5acb9825d7", name: "Content tag 1" },
    ],
  }),
  getters: {
    /* READ */
    getInterventions: (state) => state.interventions,
    getInterventionById: (state, getters) => (interventionId) =>
      getters.getInterventions.find((e) => e.interventionId === interventionId),

    getInterventionTags: (state) => state.interventionTags,
    getInterventionTagById: (state, getters) => (tagId) =>
      getters.getInterventionTags.find((e) => e.tagId === tagId),

    getAllContentByInterventionId: (state, getters) => (interventionId) =>
      getters.getInterventionById(interventionId).content,
    getContentById: (state, getters) => (interventionId, contentId) =>
      getters
        .getInterventionById(interventionId)
        .content.find((c) => c.id === contentId),
    getAllDocumentsOfIntervention: (state, getters) => (interventionId) =>
      getters
        .getInterventionById(interventionId)
        .content.filter((c) => c.type === "MarkdownDocument") || [],
    getAllImagesOfIntervention: (state, getters) => (interventionId) =>
      getters
        .getInterventionById(interventionId)
        .content.filter((c) => c.type === "Image") || [],
    getAllVideosOfIntervention: (state, getters) => (interventionId) =>
      getters
        .getInterventionById(interventionId)
        .content.filter((c) => c.type === "Video") || [],

    getInterventionContentTags: (state) => state.interventionContentTags,
    getInterventionContentTagById: (state, getters) => (tagId) =>
      getters.getInterventionContentTags.find((e) => e.tagId === tagId),
  },
  mutations: {
    /* CREATE, UPDATE, DELETE */
    addIntervention: (state, { name, description, tags }) => {
      state.interventions = state.interventions.concat({
        interventionId: uuidv4(),
        name,
        description,
        tags,
      });
    },
    replaceIntervention: (
      state,
      { interventionId, name, description, tags }
    ) => {
      state.interventions = state.interventions.map((i) =>
        i.interventionId === interventionId
          ? {
              ...i,
              interventionId,
              name,
              description,
              tags,
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
