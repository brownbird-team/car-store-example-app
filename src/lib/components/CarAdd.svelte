<script>
    import './CarAdd.css';
    import { Car } from '../car';
    import { cars } from '../stores/cars'

    let fileNameElement;
    let validatonErrors = [];
    const newCar = new Car();

    const saveCar = async () => {

        validatonErrors = newCar.validate();
        if (validatonErrors) return;
        
        validatonErrors = [];

        await newCar.fetchImage();

        cars.add(newCar.getData());
        newCar.empty();

        newCar.model = '';
        newCar.color = '';
        newCar.website = '';

        fileNameElement.innerText = 'No file selected';
    }

    const handleFileFieldChange = () => {
        fileNameElement.innerText = newCar.fileInput.files[0].name ?? 'No file selected';
    }
</script>

<div class="car-add">
    <h2>Add new car</h2>

    {#if validatonErrors.length > 0 }
        <div class="errors">
            <p><b>Following validation errors occured:</b></p>
            {#each validatonErrors as err}
                <p>{err.error}</p>
            {/each}
        </div>
    {/if}

    <div class="input-fields">
        <div>
            <label for="model">Model</label>
            <input 
                class="text-input" 
                type="text" 
                id="model" 
                bind:value={newCar.model} 
            />
        </div>
        <div>
            <label for="website">Website</label>
            <input 
                class="text-input"
                type="text" 
                id="website" 
                bind:value={newCar.website}
            />
        </div>
        <div>
            <label for="color">Color</label>
            <input 
                class="text-input"
                type="text"
                id="color" 
                bind:value={newCar.color}
            />
        </div>
        <div>
            <label for="power">Power (KS)</label>
            <input 
                class="text-input"
                type="text"
                id="power" 
                bind:value={newCar.power}
            />
        </div>

        <div class="file-upload-container">
            <label for="image" class="button file-btn">Upload car image</label>
            <span bind:this={fileNameElement}>No file selected</span>
            <input 
                hidden
                type="file" 
                id="image"
                bind:this={newCar.fileInput} 
                on:change={handleFileFieldChange} 
            />
        </div>

        <button class="button" on:click={saveCar}>Insert Car</button>
    </div>
</div>