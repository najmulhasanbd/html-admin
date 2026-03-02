document.addEventListener("DOMContentLoaded", () => {
    // --- ১. Active Link Logic (নতুন যোগ করা হয়েছে) ---
    const currentUrl = window.location.pathname.split("/").pop(); // বর্তমান পেজের নাম নেয়
    const allLinks = document.querySelectorAll(".nav-link");

    allLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentUrl) {
            // লিংকটিকে active করুন
            link.classList.add("active");

            // যদি এটি কোনো ড্রপডাউনের ভেতরে থাকে, তবে ড্রপডাউনটি ওপেন রাখুন
            const parentDropdown = link.closest(".nav-item.has-dropdown");
            if (parentDropdown) {
                parentDropdown.classList.add("open");
            }
        }
    });

    // --- ২. আপনার আগের সাইডবার টগল লজিক (ঠিক রাখা হয়েছে) ---
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const toggleIcon = document.getElementById("toggle-icon");
    const dropdownHeaders = document.querySelectorAll(".dropdown-header");

    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isMobile = window.innerWidth < 992;

            if (isMobile) {
                document.body.classList.toggle("sidebar-open");
            } else {
                const isMini = document.body.classList.contains("sidebar-mini");

                if (!isMini) {
                    document.querySelectorAll(".nav-item.open").forEach(item => {
                        item.classList.remove("open");
                    });
                }
                document.body.classList.toggle("sidebar-mini");
            }

            if (toggleIcon) {
                toggleIcon.classList.toggle("fa-bars");
                toggleIcon.classList.toggle("fa-xmark");
            }
        });
    }

    // ড্রপডাউন ওপেন/ক্লোজ লজিক
    dropdownHeaders.forEach(header => {
        header.addEventListener("click", function (e) {
            e.stopPropagation();

            if (document.body.classList.contains("sidebar-mini") && window.innerWidth > 991) return;

            const parent = this.closest(".nav-item");
            const isOpen = parent.classList.contains("open");

            document.querySelectorAll(".nav-item.has-dropdown").forEach(item => {
                if (item !== parent) item.classList.remove("open");
            });

            parent.classList.toggle("open");
        });
    });

    // আউটসাইড ক্লিক ক্লোজ (Mobile)
    document.addEventListener("click", (e) => {
        if (window.innerWidth < 992 && document.body.classList.contains("sidebar-open")) {
            const sidebar = document.getElementById("app-sidebar");
            const toggleBtn = document.getElementById("sidebar-toggle");
            if (sidebar && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                document.body.classList.remove("sidebar-open");
                if (toggleIcon) {
                    toggleIcon.classList.add("fa-bars");
                    toggleIcon.classList.remove("fa-xmark");
                }
            }
        }
    });
});

// প্রোফাইল মেনু ফাংশন
function toggleProfileMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('profileMenu');
    const arrow = document.querySelector('.dropdown-arrow');

    if (menu) {
        menu.classList.toggle('show');
        if (arrow) {
            arrow.style.transform = menu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }
}

// প্রোফাইল মেনু আউটসাইড ক্লিক ক্লোজ
document.addEventListener('click', function (e) {
    const menu = document.getElementById('profileMenu');
    const toggle = document.getElementById('profileDropdown');
    const arrow = document.querySelector('.dropdown-arrow');

    if (menu && toggle && !toggle.contains(e.target)) {
        menu.classList.remove('show');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
});

// Orders Analytics Line Chart
const ctxOrders = document.getElementById('ordersChart').getContext('2d');

const purpleGradient = ctxOrders.createLinearGradient(0, 0, 0, 400);
purpleGradient.addColorStop(0, 'rgba(60, 64, 122, 0.1)');
purpleGradient.addColorStop(1, 'rgba(60, 64, 122, 0)');

const orangeGradient = ctxOrders.createLinearGradient(0, 0, 0, 400);
orangeGradient.addColorStop(0, 'rgba(255, 164, 18, 0.1)');
orangeGradient.addColorStop(1, 'rgba(255, 164, 18, 0)');

const orderData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'Offline orders',
            data: [20, 35, 30, 55, 45, 60, 65],
            borderColor: '#3C407A',
            backgroundColor: purpleGradient,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            borderWidth: 3
        },
        {
            label: 'Online orders',
            data: [30, 25, 45, 40, 65, 50, 70],
            borderColor: '#FFA412',
            backgroundColor: orangeGradient,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            borderWidth: 3
        }
    ]
};

new Chart(ctxOrders, {
    type: 'line',
    data: orderData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: { color: '#94a3b8' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8' }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    }
});

// earning
const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
        const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
        ctx.save();
        ctx.font = 'bold 30px sans-serif';
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$452', left + width / 2, top + height / 2);
        ctx.restore();
    }
};

const data = {
    labels: ['Sales', 'Pending', 'Utilities', 'Delivery', 'Processing', 'Others'],
    datasets: [{
        data: [45, 10, 5, 15, 25, 0],
        backgroundColor: [
            '#3C407A', '#BDCFFB', '#9B8DFB', '#FFA412', '#FF8E8E', '#10B981'
        ],
        borderWidth: 0,
        hoverOffset: 4,
        cutout: '80%'
    }]
};

const config = {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
        }
    },
    plugins: [centerTextPlugin]
};

window.onload = function () {
    const ctx = document.getElementById('earningsChart').getContext('2d');
    new Chart(ctx, config);
};


