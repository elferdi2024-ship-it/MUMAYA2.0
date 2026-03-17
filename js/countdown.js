/* filepath: js/countdown.js */
class Countdown {
    constructor(targetDate, elementId) {
        this.targetDate = new Date(targetDate).getTime();
        this.element = document.getElementById(elementId);
        if (this.element) {
            this.start();
        }
    }

    start() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            clearInterval(this.interval);
            if (this.element) this.element.innerHTML = "OPEN NOW!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (this.element) {
            this.element.innerHTML = `
                <div class="time-block"><span>${days}</span>D</div>
                <div class="time-block"><span>${hours}</span>H</div>
                <div class="time-block"><span>${minutes}</span>M</div>
                <div class="time-block"><span>${seconds}</span>S</div>
            `;
        }
    }
}

// Iniciar con fecha de lanzamiento maya (ejemplo)
// new Countdown('2026-04-01T20:00:00', 'maya-countdown');
