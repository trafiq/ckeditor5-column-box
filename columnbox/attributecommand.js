import Command from '@ckeditor/ckeditor5-core/src/command'

export default class AttributeCommand extends Command {
  /**
   * @param {module:core/editor/editor~Editor} editor
   * @param {String} attributeKey Attribute that will be set by the command.
   */
  constructor (editor, attributeKey) {
    super(editor)

    /**
    * The attribute that will be set by the command.
    *
    * @readonly
    * @member {String}
    */
    this.attributeKey = attributeKey
  }

  /**
   * Updates the command's {@link #value} and {@link #isEnabled} based on the current selection.
   */
  refresh () {
    const model = this.editor.model
    const selection = model.document.selection
    const elem = selection.getSelectedElement()
    if (elem) {
      this.value = elem.hasAttribute(this.attributeKey)
    }
    this.isEnabled = true

    // this.value = this._getValueFromFirstAllowedNode()
    // this.isEnabled = model.schema.checkAttributeInSelection(doc.selection, this.attributeKey)
  }

  execute (options = {}) {
    const model = this.editor.model
    const doc = model.document
    const selection = doc.selection
    const value = (options.forceValue === undefined) ? !this.value : options.forceValue
    model.change(writer => {
      const elem = selection.getSelectedElement()
      if (value) {
        writer.setAttribute(this.attributeKey, true, elem)
      } else {
        writer.removeAttribute(this.attributeKey, elem)
      }
    })
  }
}
