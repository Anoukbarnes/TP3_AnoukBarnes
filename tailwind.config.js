const form = document.getElementById('form');
const firstname = document.getElementById('first-name'); 
const lastname = document.getElementById('last-name');
const email = document.getElementById('email');
const tel = document.getElementById('tel');
const delais = document.getElementById('delais');
const budget = document.getElementById('budget');
const description = document.getElementById('description');


form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInputs()) {
        // Si la validation est réussie, soumet le formulaire
        form.submit();
    }
});


//Fonction qui valide le formulaire 
const validateInputs = () => {
    console.log("début");
    let noError = true;

    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const telValue = tel.value.trim();
    const delaisValue = delais.value.trim();
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
        setError(email, 'Veuillez entrer votre courriel')
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
    } else {
        setSuccess(tel);
    }

    if (delaisValue === '') {
        setError(delais, 'Veuillez entrer un délais souhaité');
        noError = false;
    } else {
        setSuccess(delais);
    }

    if (descriptionValue === '') {
        setError(description, 'Veuillez entrer une description');
        noError = false;
    } else {
        setSuccess(description);
    }

    console.log("fin");

    return noError
}

//Vérifie que le email est valide
function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Vérifie que le numéro de téléphone est valide 
function validatePhoneNumber(tel) {
    const telRegex = /^\d{3}-\d{3}-\d{4}$/;
    return telRegex.test(tel);
}
