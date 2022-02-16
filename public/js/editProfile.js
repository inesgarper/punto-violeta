const form = document.querySelector('#edit-form')

const editButton = document.getElementById('edit-user-btn')

editButton.addEventListener('click', function (event) {
    console.log('click')
    form.classList.toggle('editUser-on')
})
