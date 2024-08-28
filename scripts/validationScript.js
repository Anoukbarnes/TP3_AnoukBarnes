document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const firstname = document.getElementById('firstname'); 
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    const tel = document.getElementById('tel');
    const delais = document.getElementById('delais');
    const budget = document.getElementById('budget');
    const description = document.getElementById('description');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            if (validateInputs()) {
                form.submit();
            }
        });
    }

    // Fonction qui valide le formulaire 
    const validateInputs = () => {
        let noError = true;

        const firstnameValue = firstname.value.trim();
        const lastnameValue = lastname.value.trim();
        const emailValue = email.value.trim();
        const telValue = tel.value.trim();
        const delaisValue = delais.value.trim();
        const budgetValue = budget.value;
        const descriptionValue = description.value.trim();

        if (firstnameValue === '') {
            setError(firstname, 'Veuillez entrer votre prénom');
            noError = false;
        } else {
            setSuccess(firstname);
        }

        if (lastnameValue === '') {
            setError(lastname, 'Veuillez entrer votre nom');
            noError = false;
        } else {
            setSuccess(lastname);
        }

        if (emailValue === ''){
            setError(email, 'Veuillez entrer votre courriel');
            noError = false;
        } else if (!checkEmail(emailValue)) {
            setError(email, 'Veuillez entrer une adresse courriel valide');
            noError = false;
        } else {
            setSuccess(email);
        }

        if (telValue === '') {
            setError(tel, 'Veuillez entrer un numéro de téléphone');
            noError = false;
        }  else if (!validatePhoneNumber(telValue)) {
            setError(tel, 'Veuillez entrer un numéro sous la forme 123-456-7890');
            noError = false;
        } else {
            setSuccess(tel);
        }

        if (delaisValue === '') {
            setError(delais, 'Veuillez entrer un délais souhaité');
            noError = false;
        } else {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();
            
            const delaisDate = new Date(delaisValue);
            const delaisYear = delaisDate.getFullYear();
            const delaisMonth = delaisDate.getMonth();
            const delaisDay = delaisDate.getDate();

            if (isNaN(delaisDate.getTime())) {
                setError(delais, 'Veuillez entrer une date valide');
                noError = false;
            } else if (delaisYear < currentYear || 
                      (delaisYear === currentYear && delaisMonth < currentMonth) ||
                      (delaisYear === currentYear && delaisMonth === currentMonth && delaisDay < currentDay)) {
                setError(delais, 'Veuillez entrer une date après la date actuelle');
                noError = false;
            } else {
                setSuccess(delais);
            }
        }

        if (budgetValue === ''|| budgetValue === 'default') { 
            setError(budget, 'Veuillez sélectionner un budget estimé');
            noError = false;
        } else {
            setSuccess(budget);
        }

        if (descriptionValue === '') {
            setError(description, 'Veuillez entrer une description');
            noError = false;
        } else if (descriptionValue.length < 25 || descriptionValue.length > 500) {
            setError(description, 'Veuillez entrer une description entre 25 et 500 caractères');
            noError = false;
        } else {
            setSuccess(description);
        }

        return noError;
    }

    // Vérifie que le email est valide
    function checkEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Vérifie que le numéro de téléphone est valide 
    function validatePhoneNumber(tel) {
        const telRegex = /^\d{3}-\d{3}-\d{4}$/;
        return telRegex.test(tel);
    }

    const setError = (input, message) => {
        const inputControl = input.parentElement;
        const errorDisplay = inputControl.querySelector('.errorMessage');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }

    const setSuccess = input => {
        const inputControl = input.parentElement;
        const errorDisplay = inputControl.querySelector('.errorMessage');

        errorDisplay.innerText = '';
        inputControl.classList.remove('error');
        inputControl.classList.add('success');
    }
});