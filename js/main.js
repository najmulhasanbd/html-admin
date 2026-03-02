document.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const toggleIcon = document.getElementById("toggle-icon");
    const dropdownHeaders = document.querySelectorAll(".dropdown-header");

    // 1. Sidebar Toggle (Mobile & Desktop)
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isMobile = window.innerWidth < 992;
            
            if (isMobile) {
                document.body.classList.toggle("sidebar-open");
            } else {
                const isMini = document.body.classList.contains("sidebar-mini");
                
                // NO SKIP LOGIC: Collapse all dropdowns before shrinking sidebar
                if (!isMini) {
                    document.querySelectorAll(".nav-item.open").forEach(item => {
                        item.classList.remove("open");
                    });
                }
                document.body.classList.toggle("sidebar-mini");
            }

            // Icon Change
            toggleIcon.classList.toggle("fa-bars");
            toggleIcon.classList.toggle("fa-xmark");
        });
    }

    // 2. Accordion Dropdown Logic
    dropdownHeaders.forEach(header => {
        header.addEventListener("click", function (e) {
            e.stopPropagation();
            
            // Disable click opening when sidebar is in mini-mode
            if (document.body.classList.contains("sidebar-mini") && window.innerWidth > 991) return;

            const parent = this.closest(".nav-item");
            const isOpen = parent.classList.contains("open");

            // Close other open dropdowns (Accordion Effect)
            document.querySelectorAll(".nav-item.has-dropdown").forEach(item => {
                if (item !== parent) item.classList.remove("open");
            });

            // Toggle current dropdown
            parent.classList.toggle("open");
        });
    });

    // 3. Close Sidebar on Mobile when clicking outside
    document.addEventListener("click", (e) => {
        if (window.innerWidth < 992 && document.body.classList.contains("sidebar-open")) {
            const sidebar = document.getElementById("app-sidebar");
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                document.body.classList.remove("sidebar-open");
                toggleIcon.classList.add("fa-bars");
                toggleIcon.classList.remove("fa-xmark");
            }
        }
    });
});

function toggleProfileMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('profileMenu');
    const arrow = document.querySelector('.dropdown-arrow');
    
    menu.classList.toggle('show');
    
    // তীর চিহ্ন ঘোরানো
    if(menu.classList.contains('show')) {
        arrow.style.transform = 'rotate(180deg)';
    } else {
        arrow.style.transform = 'rotate(0deg)';
    }
}

// মেনুর বাইরে ক্লিক করলে বন্ধ হয়ে যাবে
document.addEventListener('click', function(e) {
    const menu = document.getElementById('profileMenu');
    const toggle = document.getElementById('profileDropdown');
    
    if (!toggle.contains(e.target)) {
        menu.classList.remove('show');
        document.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';
    }
});