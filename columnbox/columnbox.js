import ColumnBoxEditing from './columnboxediting'
import ColumnBoxUI from './columnboxui'
import ColumnBoxToolbarUI from './columnboxtoolbarui'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default class ColumnBox extends Plugin {
  static get requires () {
    return [ColumnBoxEditing, ColumnBoxUI, ColumnBoxToolbarUI]
  }
}
