// const joinForm = document.querySelector('#join-form')

const joinButton = document.querySelectorAll('#btn-join')

console.log(joinButton.innerHTML)

// const joined = joinForm.getAttribute('action', '/eventos/{{id}}/unirse')

joinButton.addEventListener('click', function (event) {
    if (joinButton.innerHTML === 'Unirme al evento') {
        joinButton.innerHTML = 'Desunirme al evento'
    } 

    if (joinButton.innerHTML === 'Desunirme al evento') {
        joinButton.innerHTML = 'Unirme al evento'
    }

    // if (joined) {
    //     joinForm.setAttribute('action', '/eventos/{{id}}/desunirse')
    //     joinButtonText = 'Desunirme'
    // } else {
    //     joinForm.setAttribute('action', '/eventos/{{id}}/unirse')
    //     joinButtonText = 'Unirme'
    // }
})