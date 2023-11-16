<script>
    import './CarList.css';
    import trash from '../../assets/trash.svg';
    import { cars } from '../stores/cars';

    let cars_list = [];

    const handleRemoveCar = (carId) => () => cars.remove(carId);

    cars.subscribe((val) => {
        cars_list = val;
    });
</script>

<div class="car-list">
    {#each cars_list as car}
        <div class="car-item">
            <div class="image-container">
                <img src={car.image} alt="Image of car {car.model}" />
            </div>
            <div>
                <p><b>{car.model}</b></p>
                <p>
                    Car color is
                    <span class="color-field" style:background-color={car.color}></span>
                </p>
                <p>
                    More about this cat on website
                    <a target="_blank" href={car.website}>{car.website}</a>
                </p>
            </div>
            <button class="button" on:click={handleRemoveCar(car.id)}>
                <img src={trash} alt="Delete">
            </button>
        </div>
    {/each}

    {#if cars_list.length === 0}
        <div class="car-item">
            <p>
                No items to display<br>
                When you insert new cars they will be displayed here<br>
                Or you can just read 
                <a target="_blank" href="https://www.npmjs.com/package/random-quotes">quotes</a>
                from the header :)
            </p>
        </div>
    {/if}
</div>