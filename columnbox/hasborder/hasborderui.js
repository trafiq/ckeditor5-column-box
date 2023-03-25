import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

const HASBORDER = 'hasBorder'

export default class HasBorderUI extends Plugin {
  /**
   * @inheritDoc
   */
  static get pluginName () {
    return 'HasBorderUI'
  }

  /**
   * @inheritDoc
   */
  init () {
    const editor = this.editor
    const t = editor.t

    // Add bold button to feature components.
    editor.ui.componentFactory.add(HASBORDER, locale => {
      const command = editor.commands.get(HASBORDER)
      const view = new ButtonView(locale)

      view.set({
        label: t('Has Border'),
        withText: true,
        isToggleable: true
      })

      view.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled')

      this.listenTo(view, 'execute', () => {
        editor.execute(HASBORDER)
        editor.editing.view.focus()
      })

      return view
    })
  }
}
