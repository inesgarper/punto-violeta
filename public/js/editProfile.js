const form = document.querySelector('#edit-form')

const editButton = document.getElementById('edit-user-btn')

console.log(editButton)

editButton.addEventListener('click', function (event) {
    console.log('click')
    form.classList.toggle('editUser-on')
})
