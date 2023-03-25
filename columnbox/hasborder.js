import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

export default class HasBorder extends Plugin {
  init () {
    console.log('HasBorder#init() got called')
    const editor = this.editor
    // The button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add('hasBorder', locale => {
      const command = editor.commands.get('toggleBorder')
      const buttonView = new ButtonView(locale)
      buttonView.set({
        label: 'Has Border',
        isToggleable: true,
        withText: true
      })

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () => {
        editor.execute('toggleBorder')
        // editor.editing.view.focus()
      })

      return buttonView
    })
  }
}
