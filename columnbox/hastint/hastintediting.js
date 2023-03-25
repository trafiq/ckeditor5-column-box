import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import AttributeCommand from '../attributecommand'

const HASTINT = 'hasTint'

export default class HasTintEditing extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName () {
    return 'HasTintEditing'
  }

  /**
   * @inheritDoc
   */
  init () {
    const editor = this.editor
    const conversion = editor.conversion

    editor.model.schema.extend('columnBox', { allowAttributes: HASTINT })

    conversion.attributeToAttribute({
      model: HASTINT,
      view: {
        key: 'class',
        value: 'has-tint'
      }
    })

    editor.commands.add(HASTINT, new AttributeCommand(editor, HASTINT))
  }
}
