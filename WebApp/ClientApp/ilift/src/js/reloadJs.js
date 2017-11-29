export const _reloadJs = () => {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type= 'text/javascript';
    script.src= 'js/main.js';
    head.appendChild(script);
}