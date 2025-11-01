// src/main.js
import HoverPhoto from './hover-follow';

document.addEventListener('DOMContentLoaded', () => {
    const hoverPhoto = new HoverPhoto();
    hoverPhoto.init('.hover-target'); // Initialize with the target element selector
});