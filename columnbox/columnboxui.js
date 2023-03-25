import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import { isWidget, WidgetToolbarRepository } from '@ckeditor/ckeditor5-widget'

export default class ColumnBoxUI extends Plugin {
  static get requires () {
    return [WidgetToolbarRepository]
  }

  init () {
    const editor = this.editor
    const t = editor.t

    editor.ui.componentFactory.add('columnBox', locale => {
      const command = editor.commands.get('insertColumnBox')
      const buttonView = new ButtonView(locale)

      buttonView.set({
        label: t('Column Box'),
        withText: true,
        tooltip: true
      })

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')
      this.listenTo(buttonView, 'execute', () => editor.execute('insertColumnBox'))

      return buttonView
    })
  }

  afterInit () {
    const editor = this.editor
    const t = editor.t
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository)
    widgetToolbarRepository.register('columnBox', {
      ariaLabel: t('Callout Box toolbar'),
      items: editor.config.get('columnBox.toolbar'),
      // If a related element is returned the toolbar is attached
      getRelatedElement: (selection) => {
        const viewElement = selection.getSelectedElement()
        // If the viewElement is a widget and
        // the viewElement has a custom property `calloutbox`
        // return it.
        //
        // `calloutbox` is set on the view element when it is created by the writer
        // during downcast in _defineConverters
        // @see: https://ckeditor.com/docs/ckeditor5/latest/framework/guides/tutorials/implementing-a-block-widget.html#making-simple-box-a-widget
        // @see: https://github.com/ckeditor/ckeditor5/blob/master/packages/ckeditor5-media-embed/src/mediaembedediting.js#L215
        if (viewElement && isWidget(viewElement) && !!viewElement.getCustomProperty('columnbox')) {
          return viewElement
        }

        return null
      }
    })
  }
}
