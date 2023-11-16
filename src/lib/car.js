import './imageValidator';
import validate from 'validate.js';

export class BasicCarData {
    constructor() {
        this.emptyData();
    }

    getData() {
        return {
            image: this.image,
            model: this.model,
            color: this.color,
            website: this.website,
        };
    }

    emptyData() {
        this.image = '';
        this.model = '';
        this.color = '';
        this.website = '';
    }
}

export class Car extends BasicCarData {
    constructor() {
        super();

        this.fileInput = null;

        this.validationConstraints = {
            model: { 
                presence: true, 
                length: {
                    minimum: 1,
                    message: 'minimum length is 1',
                }
            },
            color: { 
                presence: true,
                format:  { 
                    pattern: /^#[0-9ABCDEFabcdef]{6}/,
                    flags: 'i',
                    message: 'must be specified in hexadecimal format, for example #FF0000 would be red',
                },
            },
            website: {
                presence: true,
                format: {
                    pattern: /^https?:\/\/.*\..*$/,
                    message: 'must be a valid car website',
                },
            },
            fileInput: {
                holdsImage: {
                    noFileMessage: 'cannot be empty',
                    notImageMessage: 'must contain valid car image',
                }
            }
        }
    }

    validate() {
        return validate(this, this.validationConstraints, { format: 'detailed' });
    }

    empty() {
        this.emptyData();
        this.fileInput.value = '';
    }

    fetchImage() {
        return new Promise((resolve, reject) => {

            const file = this.fileInput.files[0];
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                this.image = reader.result.toString();
                resolve();
            });

            reader.addEventListener('error', () => {
                alert('Failed to read car image file');
                reject(new Error('Failed to read car file'));
            });

            reader.readAsDataURL(file);
        });
    }
}