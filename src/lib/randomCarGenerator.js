import { Car } from './car';
import { cars } from './stores/cars';
import { starWars, uniqueNamesGenerator } from "unique-names-generator";

const images = Object.values(import.meta.glob('../assets/carImages/*', { eager: true })).map(img => img['default']);

export const generateCars = (numberOfCars) => {

    const genName = () => uniqueNamesGenerator({
        dictionaries: [ starWars ],
        style: 'capital',
    });

    const genPower = () => 
        Math.floor(Math.random() * 100).toString();

    const genColor = () => 
        '#' + [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    for (let i = 0; i < numberOfCars; i++) {
        const cr = new Car();

        cr.model = genName();
        cr.color = genColor();
        cr.power = genPower();
        cr.website = 'https://www.brownbird.eu';
        cr.image = images[Math.round((images.length - 1) * Math.random())];

        cars.add(cr.getData());
    }
}