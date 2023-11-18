import './imageValidator';
import validate from 'validate.js';

const carImageMaxDimensionPx = 300;

export class BasicCarData {
    constructor() {
        this.emptyData();
    }

    getData() {
        return {
            image: this.image,
            model: this.model,
            color: this.color,
            power: this.power,
            website: this.website,
        };
    }

    emptyData() {
        this.image = '';
        this.model = '';
        this.color = '';
        this.power = '';
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
            power: {
                presence: true,
                format: {
                    pattern: /[0-9]+\.?[0-9]*/,
                    message: 'must be a number',
                }
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
                
                const img = document.createElement('img');
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                img.onload = () => {

                    const dim = {};

                    if (img.height < img.width) {
                        dim.width = carImageMaxDimensionPx;
                        dim.height = Math.round(img.height * carImageMaxDimensionPx / img.width);
                    } else {
                        dim.height = carImageMaxDimensionPx;
                        dim.width = Math.round(img.width * carImageMaxDimensionPx / img.height);
                    }

                    canvas.width = dim.width;
                    canvas.height = dim.height;

                    ctx.drawImage(img, 0, 0, dim.width, dim.height);
                    this.image = canvas.toDataURL();

                    resolve(this.image);
                }

                img.src = reader.result.toString();
            });

            reader.addEventListener('error', () => {
                alert('Failed to read car image file');
                reject(new Error('Failed to read car file'));
            });

            reader.readAsDataURL(file);
        });
    }
}