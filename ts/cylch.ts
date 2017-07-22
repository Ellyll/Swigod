namespace Swigod {
    export class Cylch {
        constructor(readonly lleoliad : Fector2D, readonly radiws : number) {
        }

        get cylchedd() : number {
            return Math.PI*2*this.radiws;
        }

        ynGwrthdaro(cylch : Cylch) : boolean {
            const pellter = this.lleoliad.pellterI(cylch.lleoliad);
            return pellter <= this.radiws + cylch.radiws;
        }
    }
}