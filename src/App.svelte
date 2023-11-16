<script>
    import './css/app.css';
    import './css/inputs.css';
    import './css/buttons.css';

    import crab from './assets/crab.png';
    import CarAdd from "./lib/components/CarAdd.svelte";
    import CarList from './lib/components/CarList.svelte';

    import randomQuotes from 'random-quotes';
</script>

<main>
    <div class="header">
        <img src={crab} alt="site logo"/>
        <h1>Rainbow crabs fly high</h1>
        <p class="quote">{randomQuotes().body}</p>
    </div>
    <div class="content">
        <CarAdd />
        <div class="app-car-list-container">
            <h2>Available cars</h2>
            <CarList />
        </div>
    </div>
</main>