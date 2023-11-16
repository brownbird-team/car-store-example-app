import { writable } from 'svelte/store';

function createCarsStore() {
    let storedValue = localStorage.getItem('cars');

    if (!storedValue)
        storedValue = '[]';

    const { subscribe, set, update } = writable(JSON.parse(storedValue));
    
    const updateStorage = (val) => {
        localStorage.setItem('cars', JSON.stringify(val));
        return val;
    }

    return {
        subscribe,

        add: (carProps) => update((cars) => updateStorage([
            ...cars, { id: Math.random().toString().split('.')[1], ...carProps }
        ])),

        remove: (carId) => update((cars) => updateStorage(
            cars.filter(car => car.id !== carId)
        )),

        reset: () => set(updateStorage([])),
    };
}

export const cars = createCarsStore();