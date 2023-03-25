import Command from '@ckeditor/ckeditor5-core/src/command'

export default class InsertColumnBoxCommand extends Command {
  execute () {
    this.editor.model.change(writer => {
      // Insert <columnBox>*</columnBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertObject(createColumnBox(writer))
    })
  }

  refresh () {
    const model = this.editor.model
    const selection = model.document.selection
    const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'columnBox')

    this.isEnabled = allowedIn !== null
  }
}

function createColumnBox (writer) {
  const columnBox = writer.createElement('columnBox')
  const columnBoxFirst = writer.createElement('columnBoxFirst')
  const columnBoxSecond = writer.createElement('columnBoxSecond')
  writer.append(columnBoxFirst, columnBox)
  writer.append(columnBoxSecond, columnBox)

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  writer.appendElement('paragraph', columnBoxFirst)
  writer.appendElement('paragraph', columnBoxSecond)

  return columnBox
}
