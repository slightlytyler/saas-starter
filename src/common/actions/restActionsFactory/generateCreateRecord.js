const generateCreateRecord = createAction => createAction({
  type: 'CREATE_RECORD',
  creator: {
    initiate: type => (data, callback) => ({
      type,
      payload: data,
      meta: callback ? { callback } : undefined,
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

export default generateCreateRecord;
