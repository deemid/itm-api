$(document).ready(() => {
  document.querySelector('input[type="email"]').focus()

  // REQUEST API ACCESS FORM
  $('#form-request-api').on('submit', e => {
    e.preventDefault()
    let lastFocusedInput = $('input:focus')

    // Hide alerts
    $('#request-api-error').hide()
    $('#request-api-success').hide()

    let formSerialized = $('#form-request-api').serialize()
    let data = JSON.parse(
      '{"' +
        decodeURI(formSerialized.replace(/&/g, '","').replace(/=/g, '":"')) +
        '"}'
    )
    updateFormState('form-request-api', true)
    axios
      .post('/oauth/requestAccess', data)
      .then(res => {
        $('#request-api-success').show()
        updateFormState('form-request-api', false)
        $('#form-request-api')[0].reset()
      })
      .catch(err => {
        $('#request-api-error').show()
        updateFormState('form-request-api', false)
        let { data } = err.response
        let message = 'Error Requesting API Success'
        if (data.hasOwnProperty('errors')) {
          message = data.errors.map(e => e.msg).join('<br/>')
        }
        $('#request-api-error-message').html(message)

        if (lastFocusedInput) {
          lastFocusedInput[0].focus()
        }
      })
  })

  // ALERT CLOSE HANDLERS
  $('#request-api-success-close').on('click', e => {
    $('#request-api-success').hide()
  })

  $('#request-api-error-close').on('click', e => {
    $('#request-api-error').hide()
  })

  $('#login-error-close').on('click', e => {
    $('#login-error').hide()
  })

  // BURGER MENU
  let isBurgerOpen = false
  $('.navbar-burger').on('click', e => {
    e.preventDefault()
    isBurgerOpen = !isBurgerOpen
    $('.navbar-burger').toggleClass('is-active')
    $('#navbar-menu').toggleClass('is-active')
  })
})

const updateFormState = (formName, state) => {
  $('#' + formName + ' input').prop('disabled', state)
  $('#' + formName + ' button').prop('disabled', state)
}
