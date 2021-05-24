const COLOR_CLASS = 'editor-choose'
const CURRENT_SELECTOR = 'editor-selector-active'

$(document).ready(function () {
  $(document).on('click', (function (event) {
    const targetElm = event.target
    const notAllowElement = ['DIV', 'UL']
    const nextOfCurrentElm = $(targetElm).next()
    if (notAllowElement.includes(targetElm.tagName) || nextOfCurrentElm.is('ul')) {
      return false
    }

    $(`.${COLOR_CLASS}`).removeClass(`${COLOR_CLASS}`)
    $(targetElm).addClass(`${COLOR_CLASS}`)

    $(`.${CURRENT_SELECTOR}`).removeClass(`${CURRENT_SELECTOR}`)
    $(targetElm).addClass(`${CURRENT_SELECTOR}`)

    const innerHTML = targetElm.innerHTML.trim().replace(/<!--[\s\S]*?-->/g, '')
    console.log(innerHTML)

    // Handle click on anchor tag
    const closestLink = $(targetElm).closest('a')
    if (closestLink.length) {
      const linkHref = closestLink.attr('href')
      window.parent.translateLink(targetElm, innerHTML, linkHref)
    }

    // Handle click on img tag
    if ($(targetElm).is('img')) {
      let srcAttr = $(targetElm).attr('src').substring(1)
      srcAttr = `/sites${srcAttr}`
      window.parent.translateImage(targetElm, innerHTML, srcAttr)
    }

    // Handle click on text element tag
    window.parent.translateText(targetElm, innerHTML);

    return false
  }));

  // Handle message event from parent
  window.addEventListener('message', function (e) {
    const data = JSON.parse(e.data);

    if (typeof data === 'undefined') {
      return false;
    }

    const {message, type} = data
    if (type === 'text') {
      $(`.${CURRENT_SELECTOR}`).html(message)
    }

    if (type === 'link') {
      $(`.${CURRENT_SELECTOR}`).attr('href', message)
    }

    if (type === 'image') {
      $(`.${CURRENT_SELECTOR}`).attr('src', message)
    }

    if (type === 'design') {
      Object.keys(message).forEach((key) => {
        $(`.${CURRENT_SELECTOR}`).css(key, message[key])
      })
    }
  });
})
