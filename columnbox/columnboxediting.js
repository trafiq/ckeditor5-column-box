import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils'
import Widget from '@ckeditor/ckeditor5-widget/src/widget'
import InsertColumnBoxCommand from './insertcolumnboxcommand'
// import ToggleBorderCommand from './togglebordercommand'
// import ToggleClassCommand from './toggleclasscommand'

export default class ColumnBoxEditing extends Plugin {
  static get requires () {
    return [Widget]
  }

  init () {
    console.log('ColumnBoxEditing#init() got called')
    this._defineSchema()
    this._defineConverters()
    this.editor.commands.add('insertColumnBox', new InsertColumnBoxCommand(this.editor))
    // this.editor.commands.add('toggleBorder', new ToggleBorderCommand(this.editor))
    // this.editor.commands.add('toggleClass', new ToggleClassCommand(this.editor))
  }

  _defineSchema () {
    const schema = this.editor.model.schema

    schema.register('columnBox', {
      inheritAllFrom: '$blockObject',
      allowAttributes: 'hasBorder'
    })

    schema.register('columnBoxFirst', {
      isLimit: true,
      allowIn: 'columnBox',
      allowContentOf: '$root'
    })

    schema.register('columnBoxSecond', {
      isLimit: true,
      allowIn: 'columnBox',
      allowContentOf: '$root'
    })

    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith('columnBoxFirst') && childDefinition.name === 'columnBox') {
        return false
      }
      if (context.endsWith('columnBoxSecond') && childDefinition.name === 'columnBox') {
        return false
      }
    })
  }

  _defineConverters () {
    const conversion = this.editor.conversion

    // conversion.attributeToAttribute({
    //   model: {
    //     key: 'hasBorder'
    //   },
    //   view: {
    //     key: 'class',
    //     value: 'has-border'
    //   }
    // })

    conversion.for('upcast').elementToElement({
      model: 'columnBox',
      view: {
        name: 'div',
        classes: 'column-box'
      }
    })

    conversion.for('dataDowncast').elementToElement({
      model: 'columnBox',
      view: {
        name: 'div',
        classes: 'column-box'
      }
    })

    conversion.for('editingDowncast').elementToElement({
      model: 'columnBox',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', { class: 'column-box' })
        const widget = toWidget(div, viewWriter, { label: 'column box widget' })
        viewWriter.setCustomProperty('columnbox', true, widget)
        return widget
      }
    })

    conversion.for('upcast').elementToElement({
      model: 'columnBoxFirst',
      view: {
        name: 'div',
        classes: 'column-box-first'
      }
    })

    conversion.for('dataDowncast').elementToElement({
      model: 'columnBoxFirst',
      view: {
        name: 'div',
        classes: 'column-box-first'
      }
    })

    conversion.for('editingDowncast').elementToElement({
      model: 'columnBoxFirst',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', { class: 'column-box-first' })

        return toWidgetEditable(div, viewWriter)
      }
    })

    conversion.for('upcast').elementToElement({
      model: 'columnBoxSecond',
      view: {
        name: 'div',
        classes: 'column-box-second'
      }
    })

    conversion.for('dataDowncast').elementToElement({
      model: 'columnBoxSecond',
      view: {
        name: 'div',
        classes: 'column-box-second'
      }
    })

    conversion.for('editingDowncast').elementToElement({
      model: 'columnBoxSecond',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', { class: 'column-box-second' })

        return toWidgetEditable(div, viewWriter)
      }
    })
  }
}
