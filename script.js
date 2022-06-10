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

// value of fields
inputCharacter.value = '<,>';
inputReplacement.value = '&lt;,&gt;';
textContainer.value = '<h1>Character Replacer</h1>';

/**
 * On submit, replace the character and display the result
 */

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    fields.forEach((field) => {
        // remove class alert if the field is focused
        field.addEventListener('focus', () => {
            field.classList.remove('alert');
        });

        // verify if the fields are not empty
        isEmpty(field);
    });

    // variables
    let text = textContainer.value;
    let character = isMultiple(inputCharacter) ? inputCharacter.value.split(',') : inputCharacter.value;
    let replacement = isMultiple(inputReplacement) ? inputReplacement.value.split(',') : inputReplacement.value;

    if (!document.querySelector('.alert')) {
        // check if character and replacement are arrays
        if (typeof(character) === typeof(replacement)) {
            // check if the number of character and replacement are the same
            if (character.length == replacement.length) {
                for (let i = 0; i < character.length; i++) {
                    text = replaceCharacter(text, character[i], replacement[i]);
                }
            } else {
                text = replaceCharacter(text, character, replacement);
            }
            console.log(text);
            textResult.textContent = text;
        } else {
            inputCharacter.classList.add('alert');
            inputReplacement.classList.add('alert');
        }
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
 * @returns {boolean} 
 */
function isEmpty(element) {
    if (element.value === '') {
        element.classList.add('alert');
        setTimeout(() => {
            element.classList.remove('alert');
        }, 5000);
        return false;
    } else {
        element.classList.remove('alert');
        return true;
    }
}

/**
 * @param {*} element
 * @returns {boolean}
 */
function isMultiple(element) {
    let regex = new RegExp(/,/g);
    return regex.test(element.value);
}

/**
 * @param {*} element
 */
function copyToClipboard(element) {
    try {
        navigator.clipboard.writeText(element.textContent);
        btnCopy.classList.add('copied');
        setTimeout(() => {
            btnCopy.classList.remove('copied');
        }, 5000);
    } catch {
        console.log('Error !');
    }
}