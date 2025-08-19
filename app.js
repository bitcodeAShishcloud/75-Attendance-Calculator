// 75% Attendance Calculator - JavaScript Implementation

class AttendanceCalculator {
    constructor() {
        this.currentMode = 'simple';
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.currentCalendarType = 'held';
        
        // Calendar data storage
        this.calendarData = {
            held: new Set(),
            attended: new Set(),
            upcoming: new Set()
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderCalendar();
        this.updateCalculations();
    }

    bindEvents() {
        // Mode toggle
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
        });

        // Simple mode inputs
        const inputs = ['totalLectures', 'attendedLectures', 'upcomingLectures'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => this.updateCalculations());
                input.addEventListener('change', () => this.validateInput(input));
            }
        });

        // Calendar navigation
        document.getElementById('prevMonth')?.addEventListener('click', () => this.navigateMonth(-1));
        document.getElementById('nextMonth')?.addEventListener('click', () => this.navigateMonth(1));

        // Calendar type tabs
        document.querySelectorAll('.calendar-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchCalendarType(e.target.dataset.type));
        });

        // Action buttons
        document.getElementById('resetBtn')?.addEventListener('click', () => this.resetAll());
        document.getElementById('calculateBtn')?.addEventListener('click', () => this.updateCalculations());

        // Help modal
        document.getElementById('helpBtn')?.addEventListener('click', () => this.showModal());
        document.getElementById('closeModal')?.addEventListener('click', () => this.hideModal());
        document.getElementById('helpModal')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.hideModal();
            }
        });

        // Footer links
        document.getElementById('privacyLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPrivacyInfo();
        });
        
        document.getElementById('feedbackLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showFeedbackForm();
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }

    switchMode(mode) {
        this.currentMode = mode;
        
        // Update toggle buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Show/hide mode sections
        document.getElementById('simple-mode').classList.toggle('hidden', mode !== 'simple');
        document.getElementById('calendar-mode').classList.toggle('hidden', mode !== 'calendar');

        // Update calculations based on new mode
        this.updateCalculations();
    }

    validateInput(input) {
        const value = parseInt(input.value) || 0;
        const totalLectures = parseInt(document.getElementById('totalLectures').value) || 0;
        const attendedLectures = parseInt(document.getElementById('attendedLectures').value) || 0;

        // Validation rules
        if (value < 0) {
            input.value = 0;
        }

        if (input.id === 'attendedLectures' && value > totalLectures) {
            input.value = totalLectures;
        }

        // Update calculations after validation
        this.updateCalculations();
    }

    navigateMonth(direction) {
        this.currentMonth += direction;
        
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        
        this.renderCalendar();
    }

    switchCalendarType(type) {
        this.currentCalendarType = type;
        
        // Update tab appearance
        document.querySelectorAll('.calendar-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.type === type);
        });
        
        // Update the instruction text
        this.updateCalendarInstructions(type);
        
        // Re-render calendar to show correct selections
        this.renderCalendar();
    }

    updateCalendarInstructions(type) {
        const info = document.querySelector('.calendar-info');
        if (!info) return;

        const instructions = {
            held: 'Select dates when lectures were held (8 classes per day)',
            attended: 'Select dates when you attended lectures (8 classes per day)',
            upcoming: 'Select dates for upcoming lectures (8 classes per day)'
        };

        info.textContent = instructions[type] || instructions.held;
    }

    renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        const monthDisplay = document.getElementById('currentMonth');
        
        if (!grid || !monthDisplay) return;

        // Clear grid
        grid.innerHTML = '';

        // Update month display
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        monthDisplay.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;

        // Get first day of month and number of days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const today = new Date();

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            grid.appendChild(dayElement);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day current-month';
            dayElement.textContent = day;
            
            const dateKey = `${this.currentYear}-${this.currentMonth + 1}-${day}`;
            
            // Check if this is today
            if (today.getFullYear() === this.currentYear && 
                today.getMonth() === this.currentMonth && 
                today.getDate() === day) {
                dayElement.classList.add('today');
            }

            // Add selection classes based on stored data
            if (this.calendarData.held.has(dateKey)) {
                dayElement.classList.add('selected-held');
            }
            if (this.calendarData.attended.has(dateKey)) {
                dayElement.classList.add('selected-attended');
            }
            if (this.calendarData.upcoming.has(dateKey)) {
                dayElement.classList.add('selected-upcoming');
            }

            // Highlight current selection type more prominently
            if (this.calendarData[this.currentCalendarType].has(dateKey)) {
                dayElement.classList.add('current-selection');
            }

            // Add click handler
            dayElement.addEventListener('click', () => this.toggleDateSelection(dateKey, dayElement));
            
            grid.appendChild(dayElement);
        }

        // Update calendar summary and instructions
        this.updateCalendarSummary();
        this.updateCalendarInstructions(this.currentCalendarType);
    }

    toggleDateSelection(dateKey, dayElement) {
        const currentSet = this.calendarData[this.currentCalendarType];
        const isSelected = currentSet.has(dateKey);

        if (isSelected) {
            // Remove from current type
            currentSet.delete(dateKey);
            dayElement.classList.remove(`selected-${this.currentCalendarType}`);
            dayElement.classList.remove('current-selection');
        } else {
            // Add to current type
            currentSet.add(dateKey);
            dayElement.classList.add(`selected-${this.currentCalendarType}`);
            dayElement.classList.add('current-selection');
        }

        // Logical constraints for calendar mode
        if (this.currentCalendarType === 'attended' && !isSelected) {
            // If marking as attended, must also be marked as held
            if (!this.calendarData.held.has(dateKey)) {
                this.calendarData.held.add(dateKey);
                dayElement.classList.add('selected-held');
            }
        }

        if (this.currentCalendarType === 'held' && isSelected) {
            // If removing from held, must also remove from attended
            this.calendarData.attended.delete(dateKey);
            dayElement.classList.remove('selected-attended');
            if (this.currentCalendarType === 'held') {
                dayElement.classList.remove('current-selection');
            }
        }

        // Update visual feedback
        this.updateCalendarSummary();
        this.updateCalculations();
        
        // Show a brief visual feedback
        this.showDateSelectionFeedback(dayElement, isSelected ? 'removed' : 'added');
    }

    showDateSelectionFeedback(element, action) {
        // Brief visual feedback for date selection
        const originalTransform = element.style.transform;
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = originalTransform;
        }, 150);
    }

    updateCalendarSummary() {
        const totalSelected = document.getElementById('totalSelected');
        const attendedSelected = document.getElementById('attendedSelected');
        const upcomingSelected = document.getElementById('upcomingSelected');

        if (totalSelected) {
            const totalCount = this.calendarData.held.size;
            totalSelected.textContent = `${totalCount} days (${totalCount * 8} classes)`;
        }

        if (attendedSelected) {
            const attendedCount = this.calendarData.attended.size;
            attendedSelected.textContent = `${attendedCount} days (${attendedCount * 8} classes)`;
        }

        if (upcomingSelected) {
            const upcomingCount = this.calendarData.upcoming.size;
            upcomingSelected.textContent = `${upcomingCount} days (${upcomingCount * 8} classes)`;
        }
    }

    getCalculationData() {
        if (this.currentMode === 'simple') {
            return {
                total: parseInt(document.getElementById('totalLectures').value) || 0,
                attended: parseInt(document.getElementById('attendedLectures').value) || 0,
                upcoming: parseInt(document.getElementById('upcomingLectures').value) || 0
            };
        } else {
            return {
                total: this.calendarData.held.size * 8,
                attended: this.calendarData.attended.size * 8,
                upcoming: this.calendarData.upcoming.size * 8
            };
        }
    }

    calculateAttendance(data) {
        const { total, attended, upcoming } = data;

        if (total === 0) {
            return {
                currentPercentage: 0,
                requiredFor75: 0,
                canMiss: 0,
                status: 'no-data'
            };
        }

        // Current attendance percentage
        const currentPercentage = (attended / total) * 100;

        // Required lectures for 75%
        const requiredFor75 = Math.max(0, Math.ceil((total * 0.75) - attended));

        // How many can miss from upcoming
        const totalAfterUpcoming = total + upcoming;
        const requiredTotal75 = Math.ceil(totalAfterUpcoming * 0.75);
        const canMiss = Math.max(0, attended + upcoming - requiredTotal75);

        // Determine status
        let status = 'danger';
        if (currentPercentage >= 75) {
            status = 'success';
        } else if (currentPercentage >= 60) {
            status = 'warning';
        }

        return {
            currentPercentage: Math.round(currentPercentage * 100) / 100,
            requiredFor75,
            canMiss,
            status,
            total,
            attended,
            upcoming
        };
    }

    updateCalculations() {
        const data = this.getCalculationData();
        const results = this.calculateAttendance(data);

        // Update attendance display
        const attendanceDisplay = document.getElementById('attendanceDisplay');
        const attendancePercentage = document.getElementById('attendancePercentage');
        const currentPercentage = document.getElementById('currentPercentage');

        if (attendanceDisplay) {
            attendanceDisplay.textContent = `${data.attended} / ${data.total} lectures`;
        }

        if (attendancePercentage) {
            attendancePercentage.textContent = `${results.currentPercentage}%`;
            attendancePercentage.className = `result-percentage status-${results.status}`;
        }

        if (currentPercentage) {
            currentPercentage.textContent = `${results.currentPercentage}%`;
        }

        // Update gauge
        this.updateGauge(results.currentPercentage, results.status);

        // Update required lectures
        const requiredLectures = document.getElementById('requiredLectures');
        const requiredStatus = document.getElementById('requiredStatus');

        if (requiredLectures) {
            if (results.requiredFor75 === 0) {
                requiredLectures.textContent = "Target achieved!";
                requiredLectures.className = 'result-value status-success';
            } else {
                requiredLectures.textContent = `${results.requiredFor75} more lectures`;
                requiredLectures.className = 'result-value';
            }
        }

        if (requiredStatus) {
            if (results.requiredFor75 === 0) {
                requiredStatus.textContent = "You've reached 75%";
                requiredStatus.className = 'result-status status-success';
            } else {
                requiredStatus.textContent = "Keep attending!";
                requiredStatus.className = 'result-status';
            }
        }

        // Update can miss
        const canMissLectures = document.getElementById('canMissLectures');
        const missStatus = document.getElementById('missStatus');

        if (canMissLectures && missStatus) {
            if (data.upcoming === 0) {
                canMissLectures.textContent = "No upcoming data";
                missStatus.textContent = "Add upcoming lectures";
            } else if (results.canMiss === 0) {
                canMissLectures.textContent = "0 lectures";
                canMissLectures.className = 'result-value status-danger';
                missStatus.textContent = "Attend all upcoming";
                missStatus.className = 'result-status status-danger';
            } else {
                canMissLectures.textContent = `${results.canMiss} lectures`;
                canMissLectures.className = 'result-value status-success';
                missStatus.textContent = "From upcoming";
                missStatus.className = 'result-status';
            }
        }
    }

    updateGauge(percentage, status) {
        const gaugeFill = document.getElementById('gaugeFill');
        if (!gaugeFill) return;

        // Calculate angle (0-360 degrees)
        const angle = Math.min(360, (percentage / 100) * 360);
        
        // Set CSS custom property for the conic gradient
        gaugeFill.style.setProperty('--percentage', `${angle}deg`);

        // Update gauge color based on status
        let color = '#ef4444'; // danger
        if (status === 'success') {
            color = '#10b981';
        } else if (status === 'warning') {
            color = '#f59e0b';
        }

        gaugeFill.style.background = `conic-gradient(from -90deg, ${color} 0deg, ${color} ${angle}deg, transparent ${angle}deg)`;
    }

    resetAll() {
        // Reset simple mode inputs
        document.getElementById('totalLectures').value = '';
        document.getElementById('attendedLectures').value = '';
        document.getElementById('upcomingLectures').value = '';

        // Reset calendar data
        this.calendarData = {
            held: new Set(),
            attended: new Set(),
            upcoming: new Set()
        };

        // Re-render calendar
        this.renderCalendar();

        // Update calculations
        this.updateCalculations();
    }

    showModal() {
        const modal = document.getElementById('helpModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal() {
        const modal = document.getElementById('helpModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    showPrivacyInfo() {
        alert('Privacy Info: This application runs entirely in your browser. No data is sent to any server or stored remotely. All calculations are performed locally on your device.');
    }

    showFeedbackForm() {
        const feedback = prompt('We\'d love to hear your feedback! Please describe your experience or suggestions:');
        if (feedback && feedback.trim()) {
            alert('Thank you for your feedback! Your input helps us improve the calculator.');
        }
    }

    // Error handling
    handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        
        // Show user-friendly error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-toast';
        errorMessage.textContent = 'An error occurred. Please refresh the page and try again.';
        errorMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-error);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(errorMessage);
        
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
}

// Initialize the calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AttendanceCalculator();
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to results when calculations are made
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            setTimeout(() => {
                const resultsSection = document.querySelector('.results-section');
                if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        });
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + R for reset
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.click();
        }
    }
    
    // Ctrl/Cmd + Enter for calculate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            calculateBtn.click();
        }
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', (e) => {
        if (e.target.classList.contains('calendar-day')) {
            e.target.style.transform = 'scale(0.95)';
        }
    });

    document.addEventListener('touchend', (e) => {
        if (e.target.classList.contains('calendar-day')) {
            e.target.style.transform = '';
        }
    });
}