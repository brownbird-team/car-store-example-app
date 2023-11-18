<script>
    import './carGen.css'
    import { generateCars } from "../randomCarGenerator";
    import { cars } from '../stores/cars';

    let error = '';
    let numberOfCars = '';

    const handleGenerate = () => {

        let num = parseInt(numberOfCars);

        if (isNaN(num) || num < 1) {
            error = 'Invalid number';
            return;
        }

        error = '';
        generateCars(num);
    }

    const handleDelete = () => {
        cars.reset();
    }
</script>

<div class="car-gen">
    <p>
        Type in a number and system will generate that many random cars.
    </p>

    {#if error.length > 0}
        <p class="errors">{error}</p>
    {/if}

    <div class="input-fields">
        <div>
            <label for="cars_num">Number</label>
            <input class="text-input" id="cars_num" type="text" bind:value={numberOfCars}>
        </div>
    </div>

    <button class="button" on:click={handleGenerate}>Generate Random cars</button>
    <button class="button" on:click={handleDelete}>Delete all cars</button>
</div>