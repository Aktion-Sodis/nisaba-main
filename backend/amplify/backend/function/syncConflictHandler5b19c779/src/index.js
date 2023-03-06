exports.handler = async (event, context, callback) => {
  console.log('Received event {}', JSON.stringify(event, 3));
  let action, item;

  desired_operation = event.resolver.field;

  is_put = desired_operation.includes('add');

  is_delete = desired_operation.includes('delete');

  is_update = desired_operation.includes('update');

  if (is_put || is_update) {
    action = 'RESOLVE';
    item = event.newItem;
  }

  else {
    action = 'REMOVE';
  }
  return {
    action,
    item,
  };
};
