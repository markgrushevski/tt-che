<script setup>
import { debounce } from '@/lib/debounce.js';
import { useJokesStore } from '@/stores/useJokesStore.js';
import { computed } from 'vue';
const store = useJokesStore();

const setJokes = debounce(store.setJokes, 300);

const isJokeListEmpty = computed(() => store.jokeList && !store.jokeList.length);
</script>

<template>
    <div class="search-bar">
        <input type="search" placeholder="Search jokes..." autofocus @input="setJokes($event.target.value)" />
        <p v-show="store.jokeList?.length" class="search-bar__details">Found jokes: {{ store.jokeList?.length }}</p>
    </div>
    <div class="cards">
        <a v-for="joke in store.jokeList" :key="joke.id" class="card" :href="joke.url" target="_blank" rel="noreferrer">
            <p>{{ joke.value }}</p>
            <div class="card__description">
                <span>{{ joke.id }}</span>
                <span>{{ joke.created_at.split(' ')[0] }}</span>
            </div>
        </a>

        <p v-show="isJokeListEmpty" style="font-size: 1.5rem; font-style: italic">Jokes not found...</p>
    </div>
</template>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
    border: 0;

    font-size: inherit;
    font-family: Roboto, Arial, sans-serif;
    color: inherit;
    text-decoration: none;
}

input {
    outline: 0;
    border: 0;
    width: 100%;
    height: 100%;
}

#app {
    padding: 0 162px;
    font-size: 16px;
}

.search-bar {
    max-width: 626px;
    margin: 128px auto 40px;
}

.search-bar input {
    padding: 19px 30px;
    box-shadow: 0 7px 12px 0 rgb(100 100 111 / 20%);
}

.search-bar input,
.search-bar input::placeholder {
    font-size: 22px;
    font-weight: 700;
    color: #656ec2;
}

.search-bar .search-bar__details {
    margin: 20px 36px 0;

    line-height: 20px;
}

.cards {
    margin: 60px 0;

    display: flex;
    flex-wrap: wrap;

    justify-content: center;

    gap: 20px;
}

.card {
    max-width: 33%;
    min-height: 150px;

    padding: 40px 40px 25px;

    flex: 1 1 calc((100% - 20px * 2) / 3);

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    line-height: 24px;

    word-break: break-word;

    box-shadow: 0 7px 25px 0 rgb(100 100 111 / 20%);
    cursor: pointer;
}

.card:nth-child(1),
.card:nth-child(2) {
    max-width: 50%;
    min-height: 262px;

    flex-basis: calc((100% - 20px * 2) / 2);

    font-size: 20px;
    line-height: 30px;
}

.card__description {
    display: flex;
    justify-content: space-between;

    margin-top: 16px;

    font-size: 14px;
    line-height: 17px;

    color: #767676;
}

@media (width <= 1440px) {
    .card__description {
        flex-direction: column;
        gap: 12px;
    }
}

@media (width <= 1024px) {
    #app {
        padding: 0 80px;
    }
}

@media (width <= 768px) {
    .cards {
        flex-flow: column nowrap;
        align-items: center;
    }

    .card {
        max-width: 100% !important;
        width: 100%;
    }
}

@media (width <= 425px) {
    #app {
        padding: 0 32px;
    }
}
</style>
