namespace Swigod {
    export class Lluniadydd {
        private _context : CanvasRenderingContext2D;

        constructor(context: CanvasRenderingContext2D) {
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

        lluniadu(cylchoedd : Cylch[]) : void {
            const ctx = this._context;

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            ctx.strokeStyle = '#FFFFFF';
            cylchoedd.forEach(c => {
                ctx.beginPath();
                ctx.arc(c.lleoliad.x, c.lleoliad.y, c.radiws, 0, Math.PI*2, false);
                ctx.stroke();
            });
        }

    }
}