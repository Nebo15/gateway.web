import { Schema } from 'normalizr';
import { get } from 'lodash';

export const apiSchema = new Schema('apis', { idAttribute: 'id' });
export const requestSchema = new Schema('requests', { idAttribute: 'id' });
export const pluginsSchema = new Schema('plugins', {
  idAttribute: value => [
    get(value, 'api_id'),
    get(value, 'name'),
  ].join('.'),
});
