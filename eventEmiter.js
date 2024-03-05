const EventEmitter = () => {
  const listeners = [];

  const on = (eventName, listener) => {
    listeners.push({ [eventName]: listener })
  }

  const emit = (eventName, ...args) => {
    listeners.forEach(v => {
      if (v[eventName]) {
        v[eventName].apply(this, args);
      }
    })
  }

  const off = (eventName) => {
    listeners.forEach(v => {
      if (v[eventName]) {
        delete v[eventName];
      }
    })
  }

  return {
    on,
    emit,
    off
  }
}

const { on, emit, off } = EventEmitter();

on('haha', (args) => { console.log('haha start', args) })
off('haha')
emit('haha', 'xxx')

on('for', () => { console.log('for start') })
emit('for')
