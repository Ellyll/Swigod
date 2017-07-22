var Swigod;
(function (Swigod) {
    class App {
        cychwyn() {
            const canvas = document.getElementById("canvas");
            const context = canvas.getContext("2d");
            const lluniadydd = new Swigod.Lluniadydd(context);
            // Gosod y canvas i'r maint mwyaf bosib
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            const cylchoedd = [];
            const intArHap = (isaf, uchaf) => {
                const min = Math.ceil(isaf);
                const max = Math.floor(uchaf);
                return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
            };
            const creuCylch = () => {
                const lleoliad = new Swigod.Fector2D(intArHap(0, canvas.width - 1), intArHap(0, canvas.height - 1));
                const radiws = intArHap(1, 50);
                return new Swigod.Cylch(lleoliad, radiws);
            };
            const creuCylchHebCyffwrdd = (cylchoedd) => {
                while (true) {
                    const cylch = creuCylch();
                    if (cylchoedd.every(c => c === null || !c.ynGwrthdaro(cylch))) {
                        return cylch;
                    }
                }
            };
            for (let i = 0; i < 100; i++) {
                const cylch = creuCylchHebCyffwrdd(cylchoedd);
                cylchoedd.push(cylch);
            }
            const diweddaru = (amserDiwethaf, amser) => {
                const dt = (amser - amserDiwethaf) / 1000; // cymryd y gwahaniaeth mewn amser a troi o milieiliadau i eiliadau
                const tyfiant = 0.4 * dt;
                for (let i = 0; i < cylchoedd.length; i++) {
                    const radiwsNewydd = (cylchoedd[i].cylchedd + cylchoedd[i].cylchedd * tyfiant) / (Math.PI * 2);
                    const cylchNewydd = new Swigod.Cylch(cylchoedd[i].lleoliad, radiwsNewydd);
                    // defnyddio os dim yn gwrthdaro, fel arall creu un newydd
                    if (cylchoedd.every((c, j) => j === i || !c.ynGwrthdaro(cylchNewydd))) {
                        cylchoedd[i] = cylchNewydd;
                    }
                    else {
                        // POP!
                        cylchoedd[i] = null;
                        cylchoedd[i] = creuCylchHebCyffwrdd(cylchoedd);
                    }
                }
                lluniadydd.lluniadu(cylchoedd);
                window.requestAnimationFrame((rwan) => { diweddaru(amser, rwan); });
            };
            diweddaru(performance.now(), performance.now());
        }
    }
    Swigod.App = App;
})(Swigod || (Swigod = {}));
var Swigod;
(function (Swigod) {
    class Cylch {
        constructor(lleoliad, radiws) {
            this.lleoliad = lleoliad;
            this.radiws = radiws;
        }
        get cylchedd() {
            return Math.PI * 2 * this.radiws;
        }
        ynGwrthdaro(cylch) {
            const pellter = this.lleoliad.pellterI(cylch.lleoliad);
            return pellter <= this.radiws + cylch.radiws;
        }
    }
    Swigod.Cylch = Cylch;
})(Swigod || (Swigod = {}));
var Swigod;
(function (Swigod) {
    class Fector2D {
        constructor(x, y) {
            this._data = [x, y];
        }
        get 0() { return this._data[0]; }
        get 1() { return this._data[1]; }
        get x() { return this._data[0]; }
        get y() { return this._data[1]; }
        get length() { return 2; }
        toString() {
            return `(${Math.round(this.x * 100) / 100},${Math.round(this.y * 100) / 100})`;
        }
        // Dot product
        dot(fector) {
            return this.x * fector.x + this.y * fector.y;
        }
        lluosi(n) {
            return new Fector2D(this.x * n, this.y * n);
        }
        rhannu(n) {
            return new Fector2D(this.x / n, this.y / n);
        }
        ychwanegu(fector) {
            return new Fector2D(this.x + fector.x, this.y + fector.y);
        }
        tynnu(fector) {
            return new Fector2D(this.x - fector.x, this.y - fector.y);
        }
        maint() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        maintSgwar() {
            return this.x * this.x + this.y * this.y;
        }
        pellterI(fector) {
            const a = fector.tynnu(this);
            return a.maint();
        }
        pellterSgwarI(fector) {
            const a = fector.tynnu(this);
            return a.maintSgwar();
        }
        uned() {
            return this.rhannu(this.maint());
        }
        map(func) {
            return new Fector2D(func(this.x), func(this.y));
        }
        ynHafal(fector) {
            return this.x === fector.x && this.y === fector.y;
        }
    }
    Swigod.Fector2D = Fector2D;
})(Swigod || (Swigod = {}));
var Swigod;
(function (Swigod) {
    class Lluniadydd {
        constructor(context) {
            this._context = context;
        }
        // lliniadu(byd : Byd) : void {
        //     const ctx = this._context;
        //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        //     byd.siapiau.forEach(siap => {
        //         if (siap instanceof(Llinell)) {
        //             const llinell : Llinell = <Llinell>siap;
        //             ctx.strokeStyle = llinell.lliw.felRGBA();
        //             ctx.lineWidth = 4;
        //             ctx.beginPath();
        //             ctx.moveTo(llinell.cychwyn.x, llinell.cychwyn.y);
        //             ctx.lineTo(llinell.gorffen.x, llinell.gorffen.y);
        //             ctx.stroke();
        //         }
        //     });
        // }
        lluniadu(cylchoedd) {
            const ctx = this._context;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.strokeStyle = '#FFFFFF';
            cylchoedd.forEach(c => {
                ctx.beginPath();
                ctx.arc(c.lleoliad.x, c.lleoliad.y, c.radiws, 0, Math.PI * 2, false);
                ctx.stroke();
            });
        }
    }
    Swigod.Lluniadydd = Lluniadydd;
})(Swigod || (Swigod = {}));
//# sourceMappingURL=app.js.map