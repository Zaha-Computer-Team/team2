class HoverPhoto {
    constructor(targetSelector, photoUrl) {
        this.targetElements = document.querySelectorAll(targetSelector);
        this.photoUrl = photoUrl;
        this.photoElement = this.createPhotoElement();
        this.init();
    }

    createPhotoElement() {
        const img = document.createElement('img');
        img.src = this.photoUrl;
        img.className = 'hover-photo';
        img.style.position = 'absolute';
        img.style.pointerEvents = 'none';
        img.style.transition = 'opacity 0.2s';
        img.style.opacity = '0';
        document.body.appendChild(img);
        return img;
    }

    init() {
        this.targetElements.forEach(element => {
            element.addEventListener('mouseenter', this.onMouseEnter.bind(this));
            element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
            element.addEventListener('mousemove', this.onMouseMove.bind(this));
        });
    }

    onMouseEnter(event) {
        this.photoElement.style.opacity = '1';
        this.onMouseMove(event);
    }

    onMouseLeave() {
        this.photoElement.style.opacity = '0';
    }

    onMouseMove(event) {
        const { clientX, clientY } = event;
        this.photoElement.style.left = `${clientX + 10}px`;
        this.photoElement.style.top = `${clientY + 10}px`;
    }
}

export default HoverPhoto;