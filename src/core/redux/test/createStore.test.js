import { createStore } from '../createStore';

const initialState = {
  count: 0
};

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + 1 };
  }
  return state;
};

describe('createStore:', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  it('should be return store object', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  it('should be return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  it('should be return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  it('should be change state if actions exists', () => {
    store.dispatch({ type: 'ADD' });
    expect(store.getState().count).toBe(1);
  });

  it('should not be change state if actions don\'t exists', () => {
    store.dispatch({ type: 'NOT_EXISTING_ACTION' });
    expect(store.getState().count).toBe(0);
  });

  it('should be call subscriber function', () => {
    store.subscribe(handler);
    store.dispatch({ type: 'ADD' });
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  it('should not be call sub if unsubscribe', () => {
    const sub = store.subscribe(handler);

    sub.unsubscribe();
    store.dispatch({ type: 'ADD' });
    expect(handler).not.toHaveBeenCalled();
  });

  it('should dispatch in async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD' });
      }, 200);

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 300);
    });
  });
});
