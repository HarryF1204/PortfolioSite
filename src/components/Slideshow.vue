<template>
    <section class="gallery-container">
        <div class="gallery-grid" :class="{ single: !isModalOpen }">
            <div v-for="(image, index) in filteredImages" :key="index" class="gallery-item"
                @click="openModal(index + 1)">
                <a v-if="image.link" :href="image.link" target="_blank" rel="noopener noreferrer">
                    <img :src="image.src" :alt="image.alt" :srcset="image.srcset" :sizes="image.sizes">
                </a>
                <img v-else :src="image.src" :alt="image.alt" :srcset="image.srcset" :sizes="image.sizes">
            </div>
        </div>

        <!-- non-modal slideshow controls -->
        <div v-if="!isModalOpen" class="non-modal-controls">
            <button class="prev" @click="changeSlide(-1)">❮</button>
            <button class="next" @click="changeSlide(1)">❯</button>
            <div class="dots">
                <span v-for="(image, index) in images" :key="index" class="dot"
                    :class="{ active: currentSlide === index + 1 }" @click="currentSlide = index + 1">
                </span>
            </div>
        </div>

        <div id="galleryModal" class="modal" v-show="isModalOpen">
            <span class="close" @click="closeModal">&times;</span>
            <div class="modal-content">
                <div v-for="(image, index) in images" :key="index" class="slide"
                    :style="{ display: currentSlide === index + 1 ? 'block' : 'none' }">
                    <a v-if="image.link" :href="image.link" target="_blank" rel="noopener noreferrer">
                        <img :src="image.src" :alt="image.alt" :srcset="image.srcset" :sizes="image.sizes">
                    </a>
                    <img v-else :src="image.src" :alt="image.alt" :srcset="image.srcset" :sizes="image.sizes">
                </div>
                <button class="prev" @click="changeSlide(-1)">❮</button>
                <button class="next" @click="changeSlide(1)">❯</button>
            </div>
            <div class="dots">
                <span v-for="(image, index) in images" :key="index" class="dot"
                    :class="{ active: currentSlide === index + 1 }" @click="currentSlide = index + 1"></span>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Slideshow',
    props: {
        images: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data() {
        return {
            currentSlide: 1,
            isModalOpen: false
        }
    },
    computed: {
        filteredImages() {
            // outside full-screen, only show the current slide;
            // when modal is open, show all images (they'll be behind the overlay)
            return this.isModalOpen
                ? this.images
                : [this.images[this.currentSlide - 1]];
        }
    },
    methods: {
        openModal(index) {
            this.isModalOpen = true;
            this.currentSlide = index;
            document.body.style.overflow = "hidden";
        },
        closeModal() {
            this.isModalOpen = false;
            document.body.style.overflow = "auto";
        },
        changeSlide(direction) {
            let newSlide = this.currentSlide + direction;
            if (newSlide > this.images.length) {
                newSlide = 1;
            }
            if (newSlide < 1) {
                this.images.length;
            }
            this.currentSlide = newSlide;
        }
    },
    mounted() {
        window.addEventListener('click', (event) => {
            if (event.target.id === 'galleryModal') {
                this.closeModal();
            }
        });
    }
}
</script>

<style scoped>
.gallery-container {
    max-width: 800px;
    margin: 2rem auto;
    padding-bottom: 2rem;
    /* ensure space under single image */
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 1rem;
    overflow: hidden;
    border-radius: 8px;
    background-color: white;
}

.gallery-grid.single {
    grid-template-columns: 1fr;
    overflow: visible;
    /* allow the tall image to expand */
}

.gallery-item {
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.gallery-item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s ease;
}



.gallery-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

/* override in single-image (non-modal) view */
.gallery-grid.single .gallery-item {
    overflow: visible;
}

.gallery-grid.single .gallery-item img {
    height: auto;
    /* allow full natural height */
    max-height: 80vh;
    /* constrain to viewport height if needed */
    object-fit: contain;
    /* preserve aspect ratio */
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
}

.modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90vh;
    margin: 2rem auto;
}

.close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    z-index: 1001;
}

.modal .slide img {
    width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
}

.prev,
.next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    color: white;
    font-weight: bold;
    font-size: 24px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    cursor: pointer;
    border-radius: 50%;
    transition: 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.next {
    right: 0;
}

.prev {
    left: 0;
}

.prev:hover,
.next:hover {
    background: rgba(0, 0, 0, 0.8);
}

.dots {
    text-align: center;
    padding: 10px 0;
}

.dot {
    height: 10px;
    width: 10px;
    margin: 0 4px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    transition: 0.3s ease;
}

.dot.active,
.dot:hover {
    background-color: #333;
}

.non-modal-controls {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    pointer-events: none;
}

.non-modal-controls .prev,
.non-modal-controls .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: auto;
}

.non-modal-controls .prev {
    left: 0;
}

.non-modal-controls .next {
    right: 0;
}

.non-modal-controls .dots {
    position: absolute;
    bottom: -1.5rem;
    width: 100%;
    text-align: center;
    pointer-events: auto;
}

@media (max-width: 768px) {
    .gallery-grid {
        grid-template-columns: 1fr;
    }
}
</style>
