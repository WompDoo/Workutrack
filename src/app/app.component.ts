import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    startDate = new Date();
    today = new Date();
    pushUps = 1;
    plank = 8;
    sitUps = 1;
    kykk = 1;
    steps = 1000;
    time = 15;
    running = 7;

    MS_PER_DAY = 1000 * 60 * 60 * 24;
    dataToDisplay = {
        squat: 0,
        plank: 0,
        pushUps: 0,
        sitUps: 0,
        steps: 0,
        time: 0,
        running: 0
    }
    toggleSit = false;
    toggleSqt = false;
    togglePush = false;
    togglePlank = false;
    toggleMove = false;
    started: string | null = '';
    workoutList = true;

    ngOnInit() {
        if (!localStorage.getItem('startDate')) {
            localStorage.setItem('startDate', this.startDate.toString());
            this.setData();
        }
        this.started = localStorage.getItem('startDate');
        this.calculateExcercices();
        this.initData();
    }

    calculateExcercices() {
        const difference = this.dateDiffInDays(this.today, localStorage.getItem('startDate'));
        if (this.isEven(difference)) {
            this.pushUps++;
            this.kykk++;
            this.sitUps++;
        }
        if (difference % 7) {
            this.plank = this.plank + 8;
        }
        if (difference % 28) {
            this.time = this.time + 15;
            this.steps = this.steps + 1000;
            this.running = this.running + 7;
        }
        this.setData();

    }

    // a and b are javascript Date objects
    dateDiffInDays(a: any, b: any) {
        a = new Date(a);
        b = new Date(b);
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / this.MS_PER_DAY);
    }

    isEven(n: number) {
        if (n === 0) {
            return false;
        }
        n = Number(n);
        return n === 0 || !!(n && !(n % 2));
    }

    initData() {
        this.dataToDisplay.plank = Number(localStorage.getItem('plank'))
        this.dataToDisplay.pushUps = Number(localStorage.getItem('pushUps'))
        this.dataToDisplay.squat = Number(localStorage.getItem('kykk'))
        this.dataToDisplay.sitUps = Number(localStorage.getItem('sitUps'))
        this.dataToDisplay.time = Number(localStorage.getItem('time'))
        this.dataToDisplay.steps = Number(localStorage.getItem('steps'))
        this.dataToDisplay.running = Number(localStorage.getItem('running'))
    }

    setData() {
        localStorage.setItem('pushUps', this.pushUps.toString());
        localStorage.setItem('plank', this.plank.toString());
        localStorage.setItem('sitUps', this.sitUps.toString());
        localStorage.setItem('kykk', this.kykk.toString());
        localStorage.setItem('steps', this.steps.toString());
        localStorage.setItem('time', this.time.toString());
        localStorage.setItem('running', this.running.toString());
    }
}
