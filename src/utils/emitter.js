import EventEmitter from 'events';

const _emitter = new EventEmitter();
_emitter.setMaxListeners(100);

export const emitter = _emitter;
