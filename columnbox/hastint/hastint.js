import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import HasTintEditing from './hastintediting'
import HasTintUI from './hastintui'

export default class HasTint extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires () {
    return [HasTintEditing, HasTintUI]
  }

  /**
   * @inheritDoc
   */
  static get pluginName () {
    return 'HasTint'
  }
}
