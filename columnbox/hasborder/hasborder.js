import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import HasBorderEditing from './hasborderediting'
import HasBorderUI from './hasborderui'

export default class HasBorder extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires () {
    return [HasBorderEditing, HasBorderUI]
  }

  /**
   * @inheritDoc
   */
  static get pluginName () {
    return 'HasBorder'
  }
}
