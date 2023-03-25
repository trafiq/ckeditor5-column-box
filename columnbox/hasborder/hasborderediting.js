import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import AttributeCommand from '../attributecommand'

const HASBORDER = 'hasBorder'

export default class HasBorderEditing extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName () {
    return 'HasBorderEditing'
  }

  /**
   * @inheritDoc
   */
  init () {
    const editor = this.editor
    const conversion = editor.conversion

    editor.model.schema.extend('columnBox', { allowAttributes: HASBORDER })

    conversion.attributeToAttribute({
      model: HASBORDER,
      view: {
        key: 'class',
        value: 'has-border'
      }
    })

    editor.commands.add(HASBORDER, new AttributeCommand(editor, HASBORDER))
  }
}
