namespace Swigod {
    export class App {
        cychwyn() {
            const canvas = <HTMLCanvasElement>document.getElementById("canvas");
            const context = canvas.getContext("2d");
            const lluniadydd = new Lluniadydd(context);            

            // Gosod y canvas i'r maint mwyaf bosib
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;

            const cylchoedd : Cylch[] = [];

            const intArHap = (isaf, uchaf) => {
                const min = Math.ceil(isaf);
                const max = Math.floor(uchaf);
                return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
            };

            const creuCylch = () : Cylch => {
                const lleoliad = new Fector2D(intArHap(0, canvas.width-1), intArHap(0, canvas.height-1));
                const radiws = intArHap(1, 50);
                return new Cylch(lleoliad, radiws);
            };

            const creuCylchHebCyffwrdd = (cylchoedd : Cylch[]) : Cylch => {
                while(true) {
                    const cylch = creuCylch();
                    if (cylchoedd.every( c => c === null || !c.ynGwrthdaro(cylch))) {
                        return cylch;
                    }
                }
            };

            for (let i=0; i<100 ; i++) {
                const cylch = creuCylchHebCyffwrdd(cylchoedd);
                cylchoedd.push(cylch);
            }

            const diweddaru = (amserDiwethaf : number, amser : number) : void => {
                const dt = (amser - amserDiwethaf)/1000; // cymryd y gwahaniaeth mewn amser a troi o milieiliadau i eiliadau
                const tyfiant = 0.4 * dt;

                for (let i=0 ; i<cylchoedd.length ; i++) {
                    const radiwsNewydd = Math.sqrt((cylchoedd[i].arwynebedd + cylchoedd[i].arwynebedd*tyfiant) / Math.PI);
                    const cylchNewydd = new Cylch(cylchoedd[i].lleoliad, radiwsNewydd);
                    // defnyddio os dim yn gwrthdaro, fel arall creu un newydd
                    if (cylchoedd.every( (c, j) => j === i || !c.ynGwrthdaro(cylchNewydd))) {
                        cylchoedd[i] = cylchNewydd;
                    } else {
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
}
