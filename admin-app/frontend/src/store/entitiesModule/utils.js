const recursiveMarker = (root, markArray, returnArray = []) => {
  const notMarkedData = markArray
    .map((e) => (e.entityId === root.entityId ? { ...e, marked: true } : e))
    .filter((e) => !e.marked);
  const directChildren = notMarkedData.filter((e) => e.upperEntityId === root.entityId);
  directChildren.forEach((e) => {
    returnArray.push(e);
    recursiveMarker(e, notMarkedData, returnArray);
  });
  return returnArray;
};

export default recursiveMarker;
