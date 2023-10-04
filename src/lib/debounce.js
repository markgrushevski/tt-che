/**
 * @param {function(): any} func
 * @param {number} delay
 * @return {Function}
 */
export function debounce(func, delay) {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
