<script setup>
    import YoutubeEmbed from '@components/YoutubeEmbed.vue'
    import Tag from '@components/Tag.vue'
    import Slideshow from '@components/Slideshow.vue'

    const images = [
        {
            src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&h=600",
            alt: "Code Editor Screenshot"
        },
        {
            src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&h=600",
            alt: "System Architecture Diagram"
        },
        {
            src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&h=600",
            alt: "Development Environment"
        }
    ]
</script>

# Knots App
WIP
<Tag>test text</Tag>

<!-- <YoutubeEmbed videoId="zAEb0tSz0T0"/> -->

<Slideshow :images="images" />