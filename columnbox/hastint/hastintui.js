import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

const HASTINT = 'hasTint'

export default class HasTintUI extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName () {
    return 'HasTintUI'
  }

  /**
   * @inheritDoc
   */
  init () {
    const editor = this.editor
    const t = editor.t

    // Add bold button to feature components.
    editor.ui.componentFactory.add(HASTINT, locale => {
      const command = editor.commands.get(HASTINT)
      const view = new ButtonView(locale)

      view.set({
        label: t('Has Tint'),
        withText: true,
        isToggleable: true
      })

      view.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

      // Execute command.
      this.listenTo(view, 'execute', () => {
        editor.execute(HASTINT)
        editor.editing.view.focus()
      })

      return view
    })
  }
}
