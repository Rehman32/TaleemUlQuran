function toggleCSS() {
    var content = document.querySelector('.navbar-ul');
    content.classList.toggle('sidebar');
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const defaultActiveLink = 'home-link'; // The ID of the default active link

    // Function to set the active link
    function setActiveLink(linkId) {
        links.forEach(link => link.classList.remove('active'));
        const activeLink = document.getElementById(linkId);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Get the active link ID from local storage
    const activeLinkId = localStorage.getItem('activeLinkId') || defaultActiveLink;
    setActiveLink(activeLinkId);

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            // Save the active link ID to local storage
            localStorage.setItem('activeLinkId', this.id);
            setActiveLink(this.id);
        });
    });
});
