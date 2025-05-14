//v-model isOpened with pattern from other components //use intervention id as
optional property //wenn es gibt -> aus store -> dann ist es view mode und
optional edit mode //wenn es nicht gibt -> dann ist es create mode, empty object
mit id anlegen in on mount und autosave -> oder on isOpened true, dann on
isOpened = false cleanen //projectConfigStore -> addIntervention
//projectConfigStore -> updateIntervention //connections mit level müssen
separat geladen und gespeichert werden aus config store //logik hierfür sollte
schon da sein meine ich //für connections -> computed mit get und set, dass auf
entsprechende methoden im store pointed
