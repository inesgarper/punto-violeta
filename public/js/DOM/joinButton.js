// const joinForm = document.querySelector('#join-form')

const joinButton = document.querySelectorAll('#btn-join')

joinButton.forEach(button => {
    button.addEventListener('click', function (event) {
        if (button.innerHTML === 'Unirme al evento') {
            button.innerHTML = 'Te has unido a este evento'
        }

    })
})