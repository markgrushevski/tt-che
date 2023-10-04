import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useJokesStore = defineStore('jokes', () => {
    const jokeList = ref(null);

    const isLoading = ref(false);

    /** @param {string} query */
    async function setJokes(query) {
        query &&= query.trim();

        if (query?.length < 3) {
            jokeList.value = null;
            return;
        }

        isLoading.value = true;

        await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
            .then((res) => res.json())
            .then((res) => {
                jokeList.value = res.result;
                isLoading.value = false;
            })
            .catch((e) => {
                console.error(e);
                isLoading.value = false;
            });
    }

    return { jokeList, setJokes };
});
