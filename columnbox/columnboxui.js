import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import { isWidget, WidgetToolbarRepository } from '@ckeditor/ckeditor5-widget'

export default class ColumnBoxUI extends Plugin {
  static get requires () {
    return [WidgetToolbarRepository]
  }

  init () {
    console.log('ColumnBoxUI#init() got called')
    const editor = this.editor
    const t = editor.t

    // The "simpleBox" button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add('columnBox', locale => {
      // The state of the button will be bound to the widget command.
      const command = editor.commands.get('insertColumnBox')

      // The button will be an instance of ButtonView.
      const buttonView = new ButtonView(locale)

      buttonView.set({
        // The t() function helps localize the editor. All strings enclosed in t() can be
        // translated and change when the language of the editor changes.
        label: t('Column Box'),
        withText: true,
        tooltip: true
      })

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () => editor.execute('insertColumnBox'))

      return buttonView
    })
  }

  afterInit () {
    console.log('CalloutBoxUI#afterInit() got called')
    const editor = this.editor
    const t = editor.t
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository)
    widgetToolbarRepository.register('columnBox', {
      ariaLabel: t('Callout Box toolbar'),
      // Toolbar Buttons
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
