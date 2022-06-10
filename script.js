/**
 * Variables
 */
//form
const inputCharacter = document.querySelector('#character');
const inputReplacement = document.querySelector('#replacement');
const textContainer = document.querySelector('#text-container');
const submitButton = document.querySelector('#submit');
const fields = [inputCharacter, inputReplacement, textContainer];

// result
const textResult = document.querySelector('#text-result');
const btnCopy = document.querySelector('#copy');

/**
 * On submit, replace the character and display the result
 */

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    // verify if the fields are not empty
    isNotEmpty(inputCharacter);
    isNotEmpty(inputReplacement);
    isNotEmpty(textContainer);

    // remove classe alert if the field is focused
    fields.forEach((field) => {
        field.addEventListener('focus', () => {
            field.classList.remove('alert');
        });
    });

    if (isNotEmpty(inputCharacter) && isNotEmpty(inputReplacement) && isNotEmpty(textContainer)) {
        const text = textContainer.value;
        const character = inputCharacter.value;
        const replacement = inputReplacement.value;
        const result = replaceCharacter(text, character, replacement);
        textResult.innerHTML = result;
    }
});

/**
 * On click, copy the result to the clipboard
 */

btnCopy.addEventListener('click', () => {
    copyToClipboard(textResult);
});



/**
 * @param {*} text 
 * @param {*} character 
 * @param {*} replacement 
 * @returns {string}
 */

function replaceCharacter(text, character, replacement) {
    let regex = new RegExp(character, 'g');
    return text.replace(regex, replacement);
}

/**
 * @param {*} element 
 * @returns 
 */

function isNotEmpty(element) {
    if (element.value === '') {
        element.classList.add('alert');
        setTimeout(() => {
            element.classList.remove('alert');
        }, 5000);
    } else {
        element.classList.remove('alert');
        return true;
    }
}

/**
 * Copy element content to the clipboard
 * @param {*} element
 */
function copyToClipboard(element) {
    try {
        navigator.clipboard.writeText(element.textContent);
    } catch {
        console.log('Error !');
    }
}