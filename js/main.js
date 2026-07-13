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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Offline orders',
            data: [20, 35, 30, 55, 45, 60, 65, 80, 75, 90, 85, 110],
            borderColor: '#3C407A',
            backgroundColor: purpleGradient,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            borderWidth: 2
        },
        {
            label: 'Online orders',
            data: [30, 25, 45, 40, 65, 50, 70, 60, 85, 80, 100, 95],
            borderColor: '#FFA412',
            backgroundColor: orangeGradient,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            borderWidth: 2
        }
    ]
};

window.ordersChartInstance = new Chart(ctxOrders, {
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
    window.earningsChartInstance = new Chart(ctx, config);
};

// Task Completion Animation
document.addEventListener("DOMContentLoaded", () => {
    const todoCheckboxes = document.querySelectorAll('.todo-list .form-check-input');
    
    todoCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                // Add Strikethrough
                if (label) {
                    label.classList.add('text-muted', 'text-decoration-line-through');
                    label.classList.remove('text-dark');
                }
                
                // Trigger Confetti
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 120,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ec4899']
                    });
                }
            } else {
                // Remove Strikethrough
                if (label) {
                    label.classList.remove('text-muted', 'text-decoration-line-through');
                    label.classList.add('text-dark');
                }
            }
        });
    });
});

// --- Interactive Dashboard Scripts ---

document.addEventListener("DOMContentLoaded", () => {
    // 1. Search Bar Keyboard Shortcut (Cmd/Ctrl + K)
    const searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // 2. Select All Checkbox Logic (Recent Orders Table)
    const selectAllCheckbox = document.getElementById('selectAll');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            // Find all checkboxes in the table body
            const rowCheckboxes = this.closest('table').querySelectorAll('tbody .form-check-input');
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }

    // 3. To-Do List Toggle Logic
    const todoCheckboxes = document.querySelectorAll('.todo-list .form-check-input');
    todoCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.classList.add('text-muted', 'text-decoration-line-through');
                label.classList.remove('text-dark');
            } else {
                label.classList.remove('text-muted', 'text-decoration-line-through');
                label.classList.add('text-dark');
            }
        });
    });

    // 4. Number Counter Animation (SaaS Style)
    const statCards = document.querySelectorAll('.single_card.stat-card h3');
    statCards.forEach(el => {
        const text = el.innerText;
        // Extract numbers and non-numbers
        const match = text.match(/^([^\d]*)(\d[\d,]*)(\s*.*)$/);
        if (match) {
            const prefix = match[1];
            const numberStr = match[2].replace(/,/g, '');
            const suffix = match[3];
            const targetValue = parseInt(numberStr, 10);
            
            let startValue = 0;
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Ease out quad
                const easeOut = progress * (2 - progress);
                const currentVal = Math.floor(easeOut * targetValue);
                
                el.innerText = `${prefix}${currentVal.toLocaleString()}${suffix}`;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    el.innerText = text; // Ensure exact final value
                }
            }
            requestAnimationFrame(updateCounter);
        }
    });

    // 5. Initialize Bootstrap Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (typeof bootstrap !== 'undefined') {
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    // 6. SweetAlert2 on Table Actions
    const actionButtons = document.querySelectorAll('.table .fa-ellipsis-vertical');
    actionButtons.forEach(btn => {
        btn.closest('button').addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'Quick Action',
                text: 'What would you like to do with this order?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#6366f1',
                cancelButtonColor: '#ef4444',
                confirmButtonText: 'View Details',
                cancelButtonText: 'Cancel'
            });
        });
    });

    // 7. Real-Time Data Simulation (System Health)
    const cpuBar = document.querySelector('.fa-microchip').closest('.mb-4').querySelector('.progress-bar');
    const cpuText = document.querySelector('.fa-microchip').closest('.mb-4').querySelector('.fw-bold[style*="color: #6366f1"]');
    
    if (cpuBar && cpuText) {
        setInterval(() => {
            // Random fluctuation between -5 and +5
            let currentCpu = parseInt(cpuText.innerText);
            let diff = Math.floor(Math.random() * 11) - 5;
            let newCpu = currentCpu + diff;
            
            if(newCpu > 95) newCpu = 95;
            if(newCpu < 20) newCpu = 20;
            
            cpuText.innerText = newCpu + '%';
            cpuBar.style.width = newCpu + '%';
        }, 3000);
    }

    // 8. Random Toast Notifications
    const toastEl = document.getElementById('liveToast');
    if (toastEl && typeof bootstrap !== 'undefined') {
        const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
        const messages = [
            "A new user just registered!",
            "Payment received: ৳ 1,200",
            "Server backup completed successfully.",
            "Warning: CPU usage spiked briefly."
        ];
        
        setInterval(() => {
            // 20% chance every 10 seconds to show a toast
            if (Math.random() < 0.2) {
                const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                document.getElementById('toastMessage').innerText = randomMsg;
                toast.show();
            }
        }, 10000);
    }

    // 9. Dark Mode Toggle
    const moonIcon = document.querySelector('.fa-moon') || document.querySelector('.fa-sun');
    if (moonIcon) {
        const themeBtn = moonIcon.closest('.header-action-icon');
        
        // Check local storage on load
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            moonIcon.classList.replace('fa-moon', 'fa-sun');
            if(window.ordersChartInstance) {
                window.ordersChartInstance.options.scales.y.grid.color = 'rgba(255,255,255,0.05)';
                window.ordersChartInstance.update();
            }
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                moonIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
                // Adjust chart grids for dark mode if needed
                if(window.ordersChartInstance) {
                    window.ordersChartInstance.options.scales.y.grid.color = 'rgba(255,255,255,0.05)';
                    window.ordersChartInstance.update();
                }
            } else {
                moonIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
                if(window.ordersChartInstance) {
                    window.ordersChartInstance.options.scales.y.grid.color = 'rgba(0,0,0,0.05)';
                    window.ordersChartInstance.update();
                }
            }
        });
    }

    // 10. Live Chart Animations (Updating Data Dynamically)
    setInterval(() => {
        if (window.ordersChartInstance) {
            // Randomly adjust the last data point in the Orders chart
            const chartData = window.ordersChartInstance.data.datasets[0].data;
            let lastVal = chartData[chartData.length - 1];
            let newVal = lastVal + (Math.floor(Math.random() * 11) - 5);
            if (newVal < 10) newVal = 10;
            chartData[chartData.length - 1] = newVal;
            window.ordersChartInstance.update();
        }
        
        if (window.earningsChartInstance) {
            // Randomly adjust Doughnut chart segments
            const dData = window.earningsChartInstance.data.datasets[0].data;
            dData[0] += (Math.floor(Math.random() * 5) - 2); // Sales
            if(dData[0] < 20) dData[0] = 20;
            window.earningsChartInstance.update();
        }
    }, 4000);

    // 11. Confetti on To-Do List Complete
    function checkAllTasks() {
        const allTasks = document.querySelectorAll('.todo-list .form-check-input');
        const checkedTasks = document.querySelectorAll('.todo-list .form-check-input:checked');
        if (allTasks.length > 0 && allTasks.length === checkedTasks.length) {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#6366f1', '#10b981', '#f59e0b', '#ef4444']
                });
            }
        }
    }
    
    document.querySelectorAll('.todo-list .form-check-input').forEach(checkbox => {
        checkbox.addEventListener('change', checkAllTasks);
    });

});
