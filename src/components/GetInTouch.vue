<template>
    <div id="container">
        <h1>Get In Touch!</h1>

        <section>
            <h2>Discord</h2>
            <div class="contact-box">
                <p class="contact-text">pinkthingfromnintendo</p>
                <button class="copy-button" @click="handleCopy($event)" aria-label="Copy Discord username">
                    <div class="icon"></div>
                </button>
            </div>
        </section>

        <a href="https://github.com/HarryF1204" rel="noopener noreferrer" class="github-link">
            <img src="/icons/github-mark-white.svg" alt="GitHub" />
        </a>
    </div>
</template>

<script>
export default {
    name: "GetInTouch",
    methods: {
        handleCopy(event) {
            try {
                navigator.clipboard.writeText('pinkthingfromnintendo');
            } catch (e) {
                console.warn(e);
            }

            const button = event.currentTarget;
            button.classList.add("clicked");

            setTimeout(() => {
                button.classList.remove("clicked");
            }, 150);
        }
    }

};

</script>

<style scoped>
#container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    color: #333;
    font-family: sans-serif;
    background-color: #f8f9fa;
    gap: 24px;
}

h1 {
    font-size: 24px;
    margin-bottom: 0;
    color: #222;
    text-align: center;
}

h2 {
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 12px;
    color: #666;
    text-align: center;
}

.contact-box {
    display: flex;
    align-items: center;
    width: 320px;
    border: 1px solid #ddd;
    padding: 16px 20px;
    border-radius: 6px;
    background-color: #fff;
}

.contact-text {
    flex-grow: 1;
    margin: 0;
    font-size: 18px;
    color: #333;
    word-break: break-word;
}

.copy-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;
    transition: transform 0.15s ease;
}

.copy-button.clicked {
    transform: translateY(-4px);
}


.icon {
    width: 24px;
    height: 24px;
    background-color: #666;
    mask-image: url("/icons/copy.svg");
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-image: url("/icons/copy.svg");
    -webkit-mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    transition: background-color 0.2s ease;
}

.copy-button:hover .icon {
    background-color: #222;
}

.github-link {
    margin-top: 16px;
    display: inline-block;
    transition: transform 0.2s ease;
}

.github-link img {
    width: 48px;
    height: 48px;
    filter: brightness(0.2);
}

.github-link:hover {
    transform: scale(1.05);
}
</style>