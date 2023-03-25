import Command from '@ckeditor/ckeditor5-core/src/command'

export default class ToggleBorderCommand extends Command {
  execute () {
    const model = this.editor.model
    const doc = model.document
    const selection = doc.selection
    // const value = (options.forceValue === undefined) ? !this.value : options.forceValue
    model.change(writer => {
      const elem = selection.getSelectedElement()
      if (!this.value) {
        writer.setAttribute('hasBorder', true, elem)
      } else {
        writer.removeAttribute('hasBorder', elem)
      }
    })
  }

  refresh () {
    const model = this.editor.model
    const selection = model.document.selection
    const elem = selection.getSelectedElement()
    if (elem) {
      this.value = elem.hasAttribute('hasBorder')
    }
    this.isEnabled = true
  }
}
