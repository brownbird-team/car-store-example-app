import validate from 'validate.js';

// Register validator to test if file input element holds image file

validate.validators.holdsImage = (value, options, key, attributes) => {

    if (value.files.length === 0)
        return options.noFileMessage ?? 'File is not selected';

    if (!value.files[0].type.match('image/*'))
        return options.notImageMessage ?? 'File is not an image';

    return null;
}