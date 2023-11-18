<script>
    import './css/app.css';
    import './css/inputs.css';
    import './css/buttons.css';
    import './lib/randomCarGenerator';

    import carIcon from './assets/car.svg';
    import CarGen from './lib/components/CarGen.svelte';
    import CarAdd from "./lib/components/CarAdd.svelte";
    import CarList from './lib/components/CarList.svelte';

    import randomQuotes from 'random-quotes';
</script>

<main>
    <div class="header">
        <img src={carIcon} alt="site logo"/>
        <h1>Car store example app</h1>
        <p class="quote">{randomQuotes().body}</p>
    </div>
    <div class="content">
        <div class="app-control-container">
            <CarAdd />
            <CarGen />
        </div>
        <div class="app-car-list-container">
            <h2>Available cars</h2>
            <CarList />
        </div>
    </div>
</main>