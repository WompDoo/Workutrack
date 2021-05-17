import { Component, OnInit } from '@angular/core';

export interface WeightData {
    weight: number;
    date: Date;
    weightDiff: number;
}

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

    displayedColumns: string[] = ['date', 'weight', 'difference'];
    dataSource = [];

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

    weightData: WeightData[] = [];
    toggleSit = false;
    toggleSqt = false;
    togglePush = false;
    togglePlank = false;
    toggleMove = false;
    started: string | null = '';
    workoutList = true;
    weight: number = 0;

    dev = 0;
    devMode = false;

    ngOnInit() {
        if (!localStorage.getItem('startDate')) {
            localStorage.setItem('startDate', this.startDate.toString());
            localStorage.setItem('weightData', this.weightData.toString());
            this.setData(4);
        }
        this.started = localStorage.getItem('startDate');
        this.initData();
        this.calculateExcercices();
    }

    calculateExcercices() {
        let difference = this.dateDiffInDays(this.today, localStorage.getItem('startDate'));

        if (difference !== Number(localStorage.getItem('difference'))) {
            if (this.isEven(difference)) {
                this.pushUps++;
                this.kykk++;
                this.sitUps++;
                this.setData(1);
            }
            if (difference % 7 === 0) {
                this.plank = this.plank + 8;
                this.setData(2);
            }
            if (difference % 28 === 0) {
                this.time = this.time + 15;
                this.steps = this.steps + 1000;
                this.running = this.running + 7;
                this.setData(3);
            }

        }
        localStorage.setItem('difference', difference.toString());
        this.initData();
    }

    addWeight() {
        var oldItems = JSON.parse(localStorage.getItem('weightData') || '[]');
        var oldWeight = Number(localStorage.getItem('oldWeight'));
        let weDiff = 0;
        if (oldWeight) {
            weDiff = -oldWeight + this.weight;
        }
        var newItem = {
            weight: this.weight,
            date: this.today,
            weightDiff: weDiff
        };
        localStorage.setItem('oldWeight', JSON.stringify(this.weight));
        oldItems.unshift(newItem);
        localStorage.setItem('weightData', JSON.stringify(oldItems));
        this.dataSource = oldItems;
    }

    // a and b are javascript Date objects
    dateDiffInDays(a: any, b: any) {
        a = new Date(a);
        b = new Date(b);
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc1 - utc2) / this.MS_PER_DAY);
    }

    isEven(n: number) {
        if (n === 0) {
            return false;
        }
        n = Number(n);
        return n === 0 || !!(n && !(n % 2));
    }

    initData() {
        this.plank = Number(localStorage.getItem('plank'))
        this.pushUps = Number(localStorage.getItem('pushUps'))
        this.kykk = Number(localStorage.getItem('kykk'))
        this.sitUps = Number(localStorage.getItem('sitUps'))
        this.time = Number(localStorage.getItem('time'))
        this.steps = Number(localStorage.getItem('steps'))
        this.running = Number(localStorage.getItem('running'))

        this.dataToDisplay.plank = Number(localStorage.getItem('plank'))
        this.dataToDisplay.pushUps = Number(localStorage.getItem('pushUps'))
        this.dataToDisplay.squat = Number(localStorage.getItem('kykk'))
        this.dataToDisplay.sitUps = Number(localStorage.getItem('sitUps'))
        this.dataToDisplay.time = Number(localStorage.getItem('time'))
        this.dataToDisplay.steps = Number(localStorage.getItem('steps'))
        this.dataToDisplay.running = Number(localStorage.getItem('running'))

        this.dataSource = JSON.parse(localStorage.getItem('weightData') || '[]');
    }

    setData(check: number) {
        if (check === 1 || check === 4) {
            localStorage.setItem('pushUps', this.pushUps.toString());
            localStorage.setItem('sitUps', this.sitUps.toString());
            localStorage.setItem('kykk', this.kykk.toString());
        }
        if (check === 2 || check === 4) {
            localStorage.setItem('plank', this.plank.toString());
        }
        if (check === 3 || check === 4) {
            localStorage.setItem('steps', this.steps.toString());
            localStorage.setItem('time', this.time.toString());
            localStorage.setItem('running', this.running.toString());
        }
    }


    devModeToggle() {
        this.dev++;
        if (this.dev === 3) {
            this.devMode = true;
        }
        if (this.dev === 6) {
            this.devMode = false;
            this.dev = 0;
        }
    }

    devLvl(target: string, mode: string) {
        if (target === 'even') {
            if (mode === '+') {
                this.pushUps++;
                this.kykk++;
                this.sitUps++;
                this.setData(1);
            } else {
                this.pushUps--;
                this.kykk--;
                this.sitUps--;
                this.setData(1);
            }
        }

        if (target === 'week') {
            if (mode === '+') {
                this.plank = this.plank + 8;
                this.setData(2);
            } else {
                this.plank = this.plank - 8;
                this.setData(2);
            }
        }

        if (target === 'month') {
            if (mode === '+') {
                this.time = this.time + 15;
                this.steps = this.steps + 1000;
                this.running = this.running + 7;
                this.setData(3);
            } else {
                this.time = this.time - 15;
                this.steps = this.steps - 1000;
                this.running = this.running - 7;
                this.setData(3);
            }
        }
        this.initData();
    }
}
