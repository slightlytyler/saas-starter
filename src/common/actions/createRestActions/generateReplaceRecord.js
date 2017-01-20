const generateReplaceRecord = createAction => createAction({
  type: 'REPLACE_RECORD',
  creator: {
    initiate: type => data => ({
      type,
      payload: data,
    }),
    succeed: type => data => ({
      type,
      payload: data,
    }),
    fail: type => data => ({
      type,
      payload: data,
    }),
    cancel: type => data => ({
      type,
      payload: data,
    }),
  },
});

export default generateReplaceRecord;